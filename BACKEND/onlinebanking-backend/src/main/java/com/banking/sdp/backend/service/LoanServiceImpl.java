package com.banking.sdp.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.banking.sdp.backend.model.Loan;
import com.banking.sdp.backend.model.Customer;
import com.banking.sdp.backend.repository.LoanRepository;
import com.banking.sdp.backend.repository.TransactionRepository;
import com.banking.sdp.backend.model.Transaction;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LoanServiceImpl implements LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Loan requestLoan(Loan loan) {
        // Set default interest rate based on loan type
        if (loan.getInterestRate() == null) {
            loan.setInterestRate(calculateInterestRate(loan.getLoanType()));
        }
        
        loan.setStatus("Pending");
        loan.setRequestDate(LocalDate.now());
        
        return loanRepository.save(loan);
    }

    @Override
    public List<Loan> getCustomerLoans(Customer customer) {
        return loanRepository.findByCustomerOrderByRequestDateDesc(customer);
    }

    @Override
    public List<Loan> getAllPendingLoans() {
        return loanRepository.findByStatusOrderByRequestDateDesc("Pending");
    }

    @Override
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    @Override
    public Loan approveLoan(Long loanId, String comments) throws Exception {
        Loan loan = loanRepository.findById(loanId).orElse(null);
        
        if (loan == null) {
            throw new IllegalArgumentException("Loan not found");
        }
        
        if (!"Pending".equals(loan.getStatus())) {
            throw new IllegalArgumentException("Loan cannot be approved. Current status: " + loan.getStatus());
        }
        
        loan.setStatus("Approved");
        loan.setApprovalDate(LocalDate.now());
        loan.setComments(comments);
        
        return loanRepository.save(loan);
    }

    @Override
    public Loan rejectLoan(Long loanId, String comments) throws Exception {
        Loan loan = loanRepository.findById(loanId).orElse(null);
        
        if (loan == null) {
            throw new IllegalArgumentException("Loan not found");
        }
        
        if (!"Pending".equals(loan.getStatus())) {
            throw new IllegalArgumentException("Loan cannot be rejected. Current status: " + loan.getStatus());
        }
        
        loan.setStatus("Rejected");
        loan.setComments(comments);
        
        return loanRepository.save(loan);
    }

    @Override
    public Loan disbursement(Long loanId) throws Exception {
        Loan loan = loanRepository.findById(loanId).orElse(null);
        
        if (loan == null) {
            throw new IllegalArgumentException("Loan not found");
        }
        
        if (!"Approved".equals(loan.getStatus())) {
            throw new IllegalArgumentException("Loan must be approved before disbursement");
        }
        
        loan.setStatus("Active");
        loan.setDisbursementDate(LocalDate.now());
        
        // Create a credit transaction for the loan amount
        Transaction transaction = new Transaction();
        transaction.setCustomer(loan.getCustomer());
        transaction.setAmount(loan.getLoanAmount());
        transaction.setType("Credit");
        transaction.setDescription("Loan disbursement - " + loan.getLoanType() + " (Loan ID: " + loanId + ")");
        transaction.setTransactionDate(LocalDateTime.now());
        transactionRepository.save(transaction);
        
        return loanRepository.save(loan);
    }

    private Double calculateInterestRate(String loanType) {
        if (loanType == null) return 12.0;
        
        switch (loanType) {
            case "Home Loan":
                return 8.5;
            case "Car Loan":
                return 10.5;
            case "Personal Loan":
                return 15.0;
            case "Business Loan":
                return 12.5;
            default:
                return 12.0;
        }
    }
}

