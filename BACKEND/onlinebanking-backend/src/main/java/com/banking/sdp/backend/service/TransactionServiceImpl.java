package com.banking.sdp.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.banking.sdp.backend.model.Transaction;
import com.banking.sdp.backend.model.Customer;
import com.banking.sdp.backend.repository.TransactionRepository;
import com.banking.sdp.backend.service.CustomerService;
import com.banking.sdp.backend.service.NotificationService;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Stream;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CustomerService customerService;
    
    @Autowired
    private NotificationService notificationService;

    @Override
    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public List<Transaction> getTransactionsByCustomer(Customer customer) {
        return transactionRepository.findByCustomerOrderByTransactionDateDesc(customer);
    }

    @Override
    public List<Transaction> getTransactionsByCustomerAndDateRange(Customer customer, LocalDateTime start, LocalDateTime end) {
        return transactionRepository.findByCustomerAndTransactionDateBetweenOrderByTransactionDateDesc(customer, start, end);
    }

    @Override
    public byte[] generatePdfStatement(Customer customer, LocalDateTime start, LocalDateTime end) throws Exception {
        List<Transaction> txns = getTransactionsByCustomerAndDateRange(customer, start, end);

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, out);

        document.open();
        Font title = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
        Paragraph p = new Paragraph("Bank Statement", title);
        p.setAlignment(Element.ALIGN_CENTER);
        document.add(p);
        document.add(new Paragraph("Customer: " + customer.getFullName() + " (ID: " + customer.getId() + ")"));
        document.add(new Paragraph("From: " + start.toLocalDate() + " To: " + end.toLocalDate()));
        document.add(Chunk.NEWLINE);

        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100);
        table.setWidths(new int[]{2, 3, 2, 2, 3});

        Stream.of("Date", "Type", "Amount", "Description", "Customer ID").forEach(headerTitle -> {
            PdfPCell header = new PdfPCell();
            header.setBackgroundColor(BaseColor.LIGHT_GRAY);
            header.setBorderWidth(2);
            header.setPhrase(new Phrase(headerTitle));
            table.addCell(header);
        });

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        for (Transaction txn : txns) {
            table.addCell(txn.getTransactionDate().format(formatter));
            table.addCell(txn.getType());
            table.addCell(txn.getAmount().toString());
            table.addCell(txn.getDescription() == null ? "" : txn.getDescription());
            table.addCell(String.valueOf(txn.getCustomer().getId()));
        }

        document.add(table);
        document.close();
        return out.toByteArray();
    }

    @Override
    public Double calculateBalance(Customer customer) {
        List<Transaction> txns = getTransactionsByCustomer(customer);
        return txns.stream()
                .mapToDouble(tx -> "Credit".equalsIgnoreCase(tx.getType()) ? tx.getAmount() : -tx.getAmount())
                .sum();
    }

    @Override
    public String transferFunds(Long fromCustomerId, Long toCustomerId, Double amount) throws Exception {
        // Validate amount
        if (amount <= 0) {
            throw new IllegalArgumentException("Transfer amount must be greater than 0");
        }

        // Get customers
        Customer fromCustomer = customerService.getCustomerById(fromCustomerId);
        Customer toCustomer = customerService.getCustomerById(toCustomerId);

        if (fromCustomer == null) {
            throw new IllegalArgumentException("Sender account not found");
        }
        if (toCustomer == null) {
            throw new IllegalArgumentException("Receiver account not found");
        }
        if (fromCustomerId.equals(toCustomerId)) {
            throw new IllegalArgumentException("Cannot transfer to the same account");
        }

        // Check balance
        Double balance = calculateBalance(fromCustomer);
        if (balance < amount) {
            throw new IllegalArgumentException("Insufficient balance. Current balance: ₹" + balance);
        }

        LocalDateTime now = LocalDateTime.now();

        // Create debit transaction for sender
        Transaction debitTx = new Transaction();
        debitTx.setCustomer(fromCustomer);
        debitTx.setAmount(amount);
        debitTx.setType("Debit");
        debitTx.setDescription("Transfer to " + toCustomer.getFullName() + " (ID: " + toCustomerId + ")");
        debitTx.setTransactionDate(now);
        transactionRepository.save(debitTx);

        // Create credit transaction for receiver
        Transaction creditTx = new Transaction();
        creditTx.setCustomer(toCustomer);
        creditTx.setAmount(amount);
        creditTx.setType("Credit");
        creditTx.setDescription("Transfer from " + fromCustomer.getFullName() + " (ID: " + fromCustomerId + ")");
        creditTx.setTransactionDate(now);
        transactionRepository.save(creditTx);
        
        // Create notifications for both customers
        notificationService.createNotification(
            fromCustomer,
            "Fund Transfer",
            "₹" + amount + " debited. Transferred to " + toCustomer.getFullName(),
            "transaction"
        );
        
        notificationService.createNotification(
            toCustomer,
            "Fund Received",
            "₹" + amount + " credited from " + fromCustomer.getFullName(),
            "transaction"
        );

        return "Transfer successful! ₹" + amount + " transferred to " + toCustomer.getFullName();
    }

    @Override
    public String transferFundsByAccountNumber(Long fromCustomerId, String toAccountNumber, Double amount) throws Exception {
        // Get the receiver by account number
        Customer toCustomer = customerService.getCustomerByAccountNumber(toAccountNumber);
        
        if (toCustomer == null) {
            throw new IllegalArgumentException("Account number " + toAccountNumber + " not found");
        }
        
        // Use the existing transferFunds method
        return transferFunds(fromCustomerId, toCustomer.getId(), amount);
    }
}
