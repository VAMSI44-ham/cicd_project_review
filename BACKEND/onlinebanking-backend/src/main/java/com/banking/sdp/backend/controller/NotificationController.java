package com.banking.sdp.backend.controller;

import com.banking.sdp.backend.model.Customer;
import com.banking.sdp.backend.model.Notification;
import com.banking.sdp.backend.repository.CustomerRepository;
import com.banking.sdp.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notification")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        List<Notification> notifications = notificationService.getNotificationsByCustomer(customerId, customer);
        return ResponseEntity.ok(notifications);
    }
    
    @GetMapping("/customer/{customerId}/unread/count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(@PathVariable Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Long count = notificationService.getUnreadCount(customer);
        Map<String, Long> response = new HashMap<>();
        response.put("unreadCount", count);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/customer/{customerId}/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@PathVariable Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        List<Notification> notifications = notificationService.getUnreadNotifications(customer);
        return ResponseEntity.ok(notifications);
    }
    
    @PutMapping("/read/{notificationId}")
    public ResponseEntity<String> markAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok("Notification marked as read");
    }
    
    @PutMapping("/customer/{customerId}/read-all")
    public ResponseEntity<String> markAllAsRead(@PathVariable Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        notificationService.markAllAsRead(customerId, customer);
        return ResponseEntity.ok("All notifications marked as read");
    }
}

