package com.banking.sdp.backend.service;

import java.util.List;
import java.util.Map;
import com.banking.sdp.backend.model.Admin;
import com.banking.sdp.backend.model.Customer;
import com.banking.sdp.backend.model.Staff;

public interface AdminService {
    Admin checkAdminLogin(String username, String password);

    List<Customer> viewAllCustomers();
    List<Staff> viewAllStaff();

    String addStaff(Staff staff);
    String deleteCustomer(Long customerId);
    String deleteStaff(Long staffId);

    long getCustomerCount();
    long getStaffCount();
    
    // Reports
    Map<String, Object> getSystemReports();
}
