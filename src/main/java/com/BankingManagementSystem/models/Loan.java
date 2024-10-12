package com.BankingManagementSystem.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


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
    private Double totalAmount;
    private int tenure;
    private String status;

    @Temporal(TemporalType.DATE)
    private Date approvalDate;

    @Temporal(TemporalType.DATE)
    private Date rejectionDate;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
