package com.BankingManagementSystem.controller;

import com.BankingManagementSystem.Dto.LoanDTO;
import com.BankingManagementSystem.Dto.LoanRequestDTO;
import com.BankingManagementSystem.models.Loan;
import com.BankingManagementSystem.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PutMapping("/admin/approval/{loanId}")
    public LoanDTO approveLoan(@PathVariable Long loanId, @RequestParam String status) {
//
        Loan loan = loanService.approveLoan(loanId);
        return loan != null ? loanService.mapToLoanDTO(loan) : null;

    }
    @PutMapping("/admin/reject/{loanId}")
    public ResponseEntity<LoanDTO> rejectLoan(@PathVariable Long loanId, @RequestParam String status) {
//        System.out.println("Loan ID: " + loanId + ", Status: " + status);
//        return loanService.updateLoanStatus(loanId, status);
        Loan loan = loanService.rejectLoan(loanId);
        return loan != null ? ResponseEntity.ok(loanService.mapToLoanDTO(loan)) : ResponseEntity.notFound().build();

    }

    // **Admin-Only Endpoint** to get all loan applications
    @GetMapping("/admin/loans")
    public ResponseEntity<List<LoanDTO>> getAllLoanApplications() {
        List<LoanDTO> loans = loanService.getAllLoans();
        return ResponseEntity.ok(loans);
    }

}
