package com.BankingManagementSystem.service;

import com.BankingManagementSystem.Dto.LoanDTO;
import com.BankingManagementSystem.Dto.LoanRequestDTO;
import com.BankingManagementSystem.Repository.LoanRepository;
import com.BankingManagementSystem.Repository.UserRepository;
import com.BankingManagementSystem.models.Loan;
import com.BankingManagementSystem.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        loan.setAmount(loanRequestDTO.getAmount()); // Now using double
        loan.setTenure(loanRequestDTO.getTenure());
        loan.setInterestRate(calculateInterestRate(loanRequestDTO.getAmount(), loanRequestDTO.getTenure())); // Now using double
        loan.setStatus("Pending");
        loan.setUser(user);

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

    private LoanDTO mapToLoanDTO(Loan loan) {
        LoanDTO loanDTO = new LoanDTO();
        loanDTO.setUserId(loan.getUser().getId());
        loanDTO.setLoanId(loan.getLoanId());
        loanDTO.setLoanType(loan.getLoanType());
        loanDTO.setAmount(loan.getAmount()); // Now using double
        loanDTO.setInterestRate(loan.getInterestRate()); // Now using double
        loanDTO.setTenure(loan.getTenure());
        loanDTO.setStatus(loan.getStatus());
        return loanDTO;
    }

    // Simple interest calculation now uses double instead of BigDecimal
    private double calculateInterestRate(double amount, int tenure) {
        double annualInterestRate = 0.05;
        int years = tenure / 12;
        return amount * annualInterestRate * years;
    }
}
