package com.banking.sdp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.banking.sdp.backend.model.Loan;
import com.banking.sdp.backend.model.Customer;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByCustomerOrderByRequestDateDesc(Customer customer);
    List<Loan> findByStatusOrderByRequestDateDesc(String status);
    List<Loan> findByCustomerAndStatus(Customer customer, String status);
}

