package com.banking.sdp.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "admin_table")
public class Admin {

    @Id
    @Column(length = 50)
    private String username;

    @Column(length = 50, nullable = false)
    private String password;

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
