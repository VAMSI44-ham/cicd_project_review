package com.banking.sdp.backend.service;

import com.banking.sdp.backend.model.Loan;
import com.banking.sdp.backend.model.Customer;
import java.util.List;

public interface LoanService {
    Loan requestLoan(Loan loan);
    List<Loan> getCustomerLoans(Customer customer);
    List<Loan> getAllPendingLoans();
    Loan approveLoan(Long loanId, String comments) throws Exception;
    Loan rejectLoan(Long loanId, String comments) throws Exception;
    Loan disbursement(Long loanId) throws Exception;
    List<Loan> getAllLoans();
}

