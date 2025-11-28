package com.banking.sdp.backend.service;

import com.banking.sdp.backend.model.Customer;
import java.util.List;

public interface CustomerService {
    
    String registerCustomer(Customer customer);

    Customer checkCustomerLogin(String username, String password);

    String updateCustomerProfile(Customer customer);

    Customer getCustomerById(Long id);
    
    Customer getCustomerByAccountNumber(String accountNumber);

    List<Customer> getAllCustomers();
}
