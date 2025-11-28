package com.banking.sdp.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.banking.sdp.backend.model.Transaction;
import com.banking.sdp.backend.model.Customer;
import com.banking.sdp.backend.service.TransactionService;
import com.banking.sdp.backend.service.CustomerService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/transaction")
@CrossOrigin("*")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private CustomerService customerService;

    // Add transaction (customerId sent in request)
    @PostMapping("/add/{customerId}")
    public ResponseEntity<Transaction> addTransaction(@PathVariable Long customerId, @RequestBody Transaction transaction) {
        Customer customer = customerService.getCustomerById(customerId);
        if (customer == null) return ResponseEntity.badRequest().build();
        transaction.setCustomer(customer);
        transaction.setTransactionDate(java.time.LocalDateTime.now());
        Transaction saved = transactionService.addTransaction(transaction);
        return ResponseEntity.ok(saved);
    }

    // Get transactions of a customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Transaction>> getCustomerTransactions(@PathVariable Long customerId) {
        Customer customer = customerService.getCustomerById(customerId);
        if (customer == null) return ResponseEntity.notFound().build();
        List<Transaction> list = transactionService.getTransactionsByCustomer(customer);
        return ResponseEntity.ok(list);
    }

    // Get balance for a customer
    @GetMapping("/balance/{customerId}")
    public ResponseEntity<?> getBalance(@PathVariable Long customerId) {
        Customer customer = customerService.getCustomerById(customerId);
        if (customer == null) return ResponseEntity.notFound().build();
        Double balance = transactionService.calculateBalance(customer);
        return ResponseEntity.ok(Map.of("balance", balance));
    }

    // Download PDF statement
    @GetMapping("/customer/{customerId}/statement")
    public ResponseEntity<byte[]> downloadStatement(
            @PathVariable Long customerId,
            @RequestParam String fromDate,
            @RequestParam String toDate) {

        try {
            Customer customer = customerService.getCustomerById(customerId);
            if (customer == null) return ResponseEntity.notFound().build();

            java.time.LocalDateTime start = java.time.LocalDate.parse(fromDate).atStartOfDay();
            java.time.LocalDateTime end = java.time.LocalDate.parse(toDate).atTime(23, 59, 59);

            byte[] pdfBytes = transactionService.generatePdfStatement(customer, start, end);

            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"Bank_Statement.pdf\"")
                    .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                    .body(pdfBytes);

        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // ✅ Staff: Get all transactions
    @GetMapping("/all")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> allTxns = transactionService.getAllTransactions();
        return ResponseEntity.ok(allTxns);
    }

    // Transfer funds between customers (by ID)
    @PostMapping("/transfer")
    public ResponseEntity<?> transferFunds(
            @RequestParam Long fromCustomerId,
            @RequestParam Long toCustomerId,
            @RequestParam Double amount) {
        try {
            String result = transactionService.transferFunds(fromCustomerId, toCustomerId, amount);
            return ResponseEntity.ok(Map.of("message", result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Transfer failed: " + e.getMessage()));
        }
    }

    // Transfer funds using account number
    @PostMapping("/transfer/by-account")
    public ResponseEntity<?> transferFundsByAccount(
            @RequestParam Long fromCustomerId,
            @RequestParam String toAccountNumber,
            @RequestParam Double amount) {
        try {
            String result = transactionService.transferFundsByAccountNumber(fromCustomerId, toAccountNumber, amount);
            return ResponseEntity.ok(Map.of("message", result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Transfer failed: " + e.getMessage()));
        }
    }
}
