package com.BankingManagementSystem.service;

import com.BankingManagementSystem.Dto.LoanDTO;
import com.BankingManagementSystem.Dto.LoanRequestDTO;
import com.BankingManagementSystem.Repository.LoanRepository;
import com.BankingManagementSystem.Repository.UserRepository;
import com.BankingManagementSystem.models.Loan;
import com.BankingManagementSystem.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private UserRepository userRepository;

    public LoanDTO applyLoan(LoanRequestDTO loanRequestDTO, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Loan loan = new Loan();
        loan.setLoanType(loanRequestDTO.getLoanType());
        loan.setAmount(loanRequestDTO.getAmount()); // Principal amount
        loan.setTenure(loanRequestDTO.getTenure());
        loan.setInterestRate(loanRequestDTO.getInterestRate()); // Custom interest rate

        // Calculate total interest based on the principal, interest rate, and tenure
        double interestAmount = calculateInterestAmount(loanRequestDTO.getAmount(), loanRequestDTO.getInterestRate(), loanRequestDTO.getTenure());

        // Store the total amount (principal + interest)
        double totalAmount = loanRequestDTO.getAmount() + interestAmount;
        loan.setTotalAmount(totalAmount);  // Assuming totalAmount field exists in Loan entity

        loan.setStatus("Pending");
        loan.setUser(user);

        // Save the loan
        Loan savedLoan = loanRepository.save(loan);
        return mapToLoanDTO(savedLoan);
    }

    public List<LoanDTO> getLoansByUserId(Long userId) {
        return loanRepository.findByUserId(userId)
                .stream()
                .map(this::mapToLoanDTO)
                .collect(Collectors.toList());
    }

    public LoanDTO updateLoanStatus(Long loanId, String status) {
        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new RuntimeException("Loan not found"));
        loan.setStatus(status);
        Loan updatedLoan = loanRepository.save(loan);
        return mapToLoanDTO(updatedLoan);
    }
    // Method to fetch all loan applications for admin
    public List<LoanDTO> getAllLoans() {
        List<Loan> loans = loanRepository.findAll(); // Fetch all loans from the repository
        return loans.stream().map(this::mapToLoanDTO).collect(Collectors.toList());
    }


    public Loan approveLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId).orElse(null);
        if (loan != null) {
            loan.setStatus("Approved");
            loan.setApprovalDate(new Date());
            loan.setRejectionDate(null);
            loanRepository.save(loan);
        }
        return loan;
    }


    public Loan rejectLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId).orElse(null);
        if (loan != null) {
            loan.setStatus("Rejected");
            loan.setRejectionDate(new Date());
            loan.setApprovalDate(null);
            loanRepository.save(loan);
        }
        return loan;
    }

    public LoanDTO mapToLoanDTO(Loan loan) {
        LoanDTO loanDTO = new LoanDTO();
        loanDTO.setUserId(loan.getUser().getId());
        loanDTO.setLoanId(loan.getLoanId());
        loanDTO.setLoanType(loan.getLoanType());
        loanDTO.setAmount(loan.getAmount());
        loanDTO.setInterestRate(loan.getInterestRate());
        loanDTO.setTotalAmount(loan.getTotalAmount());
        loanDTO.setTenure(loan.getTenure());
        loanDTO.setStatus(loan.getStatus());
        loanDTO.setApprovalDate(loan.getApprovalDate());
        loanDTO.setRejectionDate(loan.getRejectionDate());
        return loanDTO;
    }

    // Method to calculate total interest amount based on principal, interest rate, and tenure
    private double calculateInterestAmount(double amount, double interestRate, int tenure) {
        // Assuming tenure is in years. If tenure is in months, divide by 12.
        return (amount * interestRate * tenure) / 100;  // Interest rate is divided by 100 to convert to decimal
    }
}