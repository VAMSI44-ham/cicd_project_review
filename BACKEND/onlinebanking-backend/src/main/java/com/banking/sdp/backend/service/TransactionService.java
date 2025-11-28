package com.banking.sdp.backend.service;

import com.banking.sdp.backend.model.Transaction;
import com.banking.sdp.backend.model.Customer;

import java.time.LocalDateTime;
import java.util.List;

public interface TransactionService {
    Transaction addTransaction(Transaction transaction);
    List<Transaction> getAllTransactions();
    List<Transaction> getTransactionsByCustomer(Customer customer);
    List<Transaction> getTransactionsByCustomerAndDateRange(Customer customer, LocalDateTime start, LocalDateTime end);
    byte[] generatePdfStatement(Customer customer, LocalDateTime start, LocalDateTime end) throws Exception;

    Double calculateBalance(Customer customer);
    
    // Fund transfer between customers
    String transferFunds(Long fromCustomerId, Long toCustomerId, Double amount) throws Exception;
    
    // Fund transfer using account numbers
    String transferFundsByAccountNumber(Long fromCustomerId, String toAccountNumber, Double amount) throws Exception;
}
