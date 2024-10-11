package com.BankingManagementSystem.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long LoanId;
    private String loanType;
    private Double amount;
    private Double interestRate;
    private int tenure;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
