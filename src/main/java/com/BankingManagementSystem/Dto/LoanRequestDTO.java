package com.BankingManagementSystem.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanRequestDTO {
    private String loanType;
    private Double amount;
    private Double interestRate;
    private Double totalAmount;
    private int tenure;

    // Getters and Setters
}
