package com.banking.sdp.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.banking.sdp.backend.model.Customer;
import com.banking.sdp.backend.service.CustomerService;
import com.banking.sdp.backend.dto.JwtResponse;
import com.banking.sdp.backend.util.JwtUtil;

@RestController
@RequestMapping("/customer")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private JwtUtil jwtUtil;

    // Registration
    @PostMapping("/register")
    public ResponseEntity<String> registerCustomer(@RequestBody Customer customer) {
        try {
            String result = customerService.registerCustomer(customer);

            if (result.contains("exists")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(result);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration Failed");
        }
    }

    // Login with JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Customer customer) {
        Customer c = customerService.checkCustomerLogin(customer.getUsername(), customer.getPassword());
        if (c != null) {
            String token = jwtUtil.generateToken(c.getUsername(), "CUSTOMER", c.getId());
            JwtResponse response = new JwtResponse(token, c.getId(), c.getUsername(), "CUSTOMER");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Username or Password");
        }
    }

    // Update Profile
    @PutMapping("/updateprofile")
    public ResponseEntity<String> updateProfile(@RequestBody Customer customer) {
        try {
            String result = customerService.updateCustomerProfile(customer);

            if (result.contains("exists")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
            }
            if (result.contains("Not Found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
            }

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Profile Update Failed");
        }
    }

    // Get Customer by ID
    @GetMapping("/{customerId}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long customerId) {
        Customer customer = customerService.getCustomerById(customerId);
        if (customer == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(customer);
    }
}
