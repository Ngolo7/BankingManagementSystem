package com.BankingManagementSystem.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanDTO {
    private Long LoanId;
    private String loanType;
    private Double amount;
    private Double interestRate;
    private int tenure;
    private String status;
    private Long userId;

    // Getters and Setters
}
