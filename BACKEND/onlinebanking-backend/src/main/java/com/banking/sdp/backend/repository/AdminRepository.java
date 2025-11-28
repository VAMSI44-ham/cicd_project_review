package com.banking.sdp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.banking.sdp.backend.model.Admin;
 

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
    Admin findByUsernameAndPassword(String username, String password);
}
 