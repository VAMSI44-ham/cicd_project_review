package com.banking.sdp.backend.service;

import com.banking.sdp.backend.model.Staff;

public interface StaffService {
    Staff checkStaffLogin(String username, String password);
    Staff getStaffProfile(Long staffId);

    // For admin to add staff
    String registerStaff(Staff staff);
}
