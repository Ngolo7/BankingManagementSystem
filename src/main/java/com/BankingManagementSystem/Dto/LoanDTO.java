package com.BankingManagementSystem.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanDTO {
    private Long LoanId;
    private String loanType;
    private Double amount;
    private Double interestRate;
    private Double totalAmount;
    private int tenure;
    private String status;
    private Long userId;
    private Date approvalDate;
    private Date rejectionDate;


    // Getters and Setters
}
