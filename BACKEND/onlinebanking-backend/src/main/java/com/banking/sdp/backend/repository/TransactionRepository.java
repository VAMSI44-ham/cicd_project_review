package com.banking.sdp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.banking.sdp.backend.model.Transaction;
import com.banking.sdp.backend.model.Customer;
import java.util.List;
import java.time.LocalDateTime;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByCustomerOrderByTransactionDateDesc(Customer customer);

    List<Transaction> findByCustomerAndTransactionDateBetweenOrderByTransactionDateDesc(
            Customer customer, LocalDateTime start, LocalDateTime end);
}
