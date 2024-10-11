package com.BankingManagementSystem.controller;

import com.BankingManagementSystem.Dto.LoanDTO;
import com.BankingManagementSystem.Dto.LoanRequestDTO;
import com.BankingManagementSystem.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @PostMapping("/apply/{userId}")
    public LoanDTO applyLoan(@RequestBody LoanRequestDTO loanRequestDTO, @PathVariable Long userId) {
        return loanService.applyLoan(loanRequestDTO, userId);
    }

    @GetMapping("/status/{userId}")
    public List<LoanDTO> getLoanStatus(@PathVariable Long userId) {
        return loanService.getLoansByUserId(userId);
    }

    @PutMapping("/approval/{loanId}")
    public LoanDTO approveLoan(@PathVariable Long loanId, @RequestParam String status) {
        return loanService.updateLoanStatus(loanId, status);
    }
}
