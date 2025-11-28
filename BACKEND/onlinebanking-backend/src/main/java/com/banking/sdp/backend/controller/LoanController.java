package com.banking.sdp.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.banking.sdp.backend.model.Loan;
import com.banking.sdp.backend.model.Customer;
import com.banking.sdp.backend.service.LoanService;
import com.banking.sdp.backend.service.CustomerService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/loan")
@CrossOrigin("*")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @Autowired
    private CustomerService customerService;

    // Customer: Request a loan
    @PostMapping("/request/{customerId}")
    public ResponseEntity<?> requestLoan(@PathVariable Long customerId, @RequestBody Loan loan) {
        try {
            Customer customer = customerService.getCustomerById(customerId);
            if (customer == null) {
                return ResponseEntity.status(404).body(Map.of("error", "Customer not found"));
            }
            
            loan.setCustomer(customer);
            Loan savedLoan = loanService.requestLoan(loan);
            return ResponseEntity.ok(savedLoan);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to request loan: " + e.getMessage()));
        }
    }

    // Customer: Get my loans
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Loan>> getCustomerLoans(@PathVariable Long customerId) {
        Customer customer = customerService.getCustomerById(customerId);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(loanService.getCustomerLoans(customer));
    }

    // Staff: Get all pending loans
    @GetMapping("/pending")
    public ResponseEntity<List<Loan>> getPendingLoans() {
        return ResponseEntity.ok(loanService.getAllPendingLoans());
    }

    // Staff: Get all loans
    @GetMapping("/all")
    public ResponseEntity<List<Loan>> getAllLoans() {
        return ResponseEntity.ok(loanService.getAllLoans());
    }

    // Staff: Approve loan
    @PutMapping("/approve/{loanId}")
    public ResponseEntity<?> approveLoan(
            @PathVariable Long loanId,
            @RequestBody Map<String, String> request) {
        try {
            String comments = request.getOrDefault("comments", "Loan approved by staff");
            Loan approvedLoan = loanService.approveLoan(loanId, comments);
            return ResponseEntity.ok(approvedLoan);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to approve loan: " + e.getMessage()));
        }
    }

    // Staff: Reject loan
    @PutMapping("/reject/{loanId}")
    public ResponseEntity<?> rejectLoan(
            @PathVariable Long loanId,
            @RequestBody Map<String, String> request) {
        try {
            String comments = request.getOrDefault("comments", "Loan rejected");
            Loan rejectedLoan = loanService.rejectLoan(loanId, comments);
            return ResponseEntity.ok(rejectedLoan);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to reject loan: " + e.getMessage()));
        }
    }

    // Staff: Disburse loan (transfer money to customer account)
    @PutMapping("/disburse/{loanId}")
    public ResponseEntity<?> disburseLoan(@PathVariable Long loanId) {
        try {
            Loan disbursedLoan = loanService.disbursement(loanId);
            return ResponseEntity.ok(Map.of("message", "Loan disbursed successfully", "loan", disbursedLoan));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to disburse loan: " + e.getMessage()));
        }
    }
}

