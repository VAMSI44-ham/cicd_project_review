package com.banking.sdp.backend.dto;

import java.time.LocalDateTime;

public class TransactionDTO {
    private Long id;
    private Long customerId;
    private String customerName;
    private String type;
    private Double amount;
    private String description;
    private LocalDateTime transactionDate;

    // Constructor
    public TransactionDTO(Long id, Long customerId, String customerName, String type,
                          Double amount, String description, LocalDateTime transactionDate) {
        this.id = id;
        this.customerId = customerId;
        this.customerName = customerName;
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.transactionDate = transactionDate;
    }

    // Getters
    public Long getId() { return id; }
    public Long getCustomerId() { return customerId; }
    public String getCustomerName() { return customerName; }
    public String getType() { return type; }
    public Double getAmount() { return amount; }
    public String getDescription() { return description; }
    public LocalDateTime getTransactionDate() { return transactionDate; }
}
