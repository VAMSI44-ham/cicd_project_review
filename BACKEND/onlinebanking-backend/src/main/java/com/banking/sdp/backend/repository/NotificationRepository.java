package com.banking.sdp.backend.repository;

import com.banking.sdp.backend.model.Notification;
import com.banking.sdp.backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByCustomerOrderByCreatedAtDesc(Customer customer);
    List<Notification> findByCustomerAndIsReadFalse(Customer customer);
    Long countByCustomerAndIsReadFalse(Customer customer);
}

