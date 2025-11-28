package com.banking.sdp.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.banking.sdp.backend.model.Staff;
import com.banking.sdp.backend.service.StaffService;
import com.banking.sdp.backend.model.Customer;
import com.banking.sdp.backend.model.Transaction;
import com.banking.sdp.backend.service.TransactionService;
import com.banking.sdp.backend.service.CustomerService;
import com.banking.sdp.backend.dto.JwtResponse;
import com.banking.sdp.backend.util.JwtUtil;

import java.util.List;

@RestController
@RequestMapping("/staff")
@CrossOrigin("*")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private JwtUtil jwtUtil;

    // Staff login with JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Staff staff) {
        Staff s = staffService.checkStaffLogin(staff.getUsername(), staff.getPassword());
        if (s != null) {
            String token = jwtUtil.generateToken(s.getUsername(), "STAFF", s.getId());
            JwtResponse response = new JwtResponse(token, s.getId(), s.getUsername(), "STAFF");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Invalid Username or Password");
        }
    }

    // Get staff profile
    @GetMapping("/profile/{staffId}")
    public ResponseEntity<?> getProfile(@PathVariable Long staffId) {
        Staff s = staffService.getStaffProfile(staffId);
        if (s != null) return ResponseEntity.ok(s);
        else return ResponseEntity.status(404).body("Staff Not Found");
    }

    // Admin: Add staff with duplicate checks
    @PostMapping("/add")
    public ResponseEntity<String> addStaff(@RequestBody Staff staff) {
        String result = staffService.registerStaff(staff);
        if (result.contains("exists")) {
            return ResponseEntity.status(400).body(result);
        }
        return ResponseEntity.ok(result);
    }

    // Get dashboard stats for staff
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardStats() {
        List<Customer> customers = customerService.getAllCustomers();
        List<Transaction> transactions = transactionService.getAllTransactions();

        long totalCustomers = customers.size();
        long totalDeposits = transactions.stream()
                .filter(tx -> "Credit".equalsIgnoreCase(tx.getType()))
                .count();
        long totalWithdrawals = transactions.stream()
                .filter(tx -> "Debit".equalsIgnoreCase(tx.getType()))
                .count();

        return ResponseEntity.ok(new StaffDashboardStats(totalCustomers, totalDeposits, totalWithdrawals));
    }

    // DTO for dashboard
    public static class StaffDashboardStats {
        public long totalCustomers;
        public long totalDeposits;
        public long totalWithdrawals;

        public StaffDashboardStats(long totalCustomers, long totalDeposits, long totalWithdrawals) {
            this.totalCustomers = totalCustomers;
            this.totalDeposits = totalDeposits;
            this.totalWithdrawals = totalWithdrawals;
        }
    }
}
