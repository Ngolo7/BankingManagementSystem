import React, { useEffect, useState } from "react";
import { getLoanApplications, approveLoan } from "../services/LoanService";

const AdminPanel = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await getLoanApplications();
        setLoans(response.data);
      } catch (error) {
        console.error("Error fetching loan applications:", error);
      }
    };
    fetchLoans();
  }, []);

  const handleApprove = async (loanId) => {
    try {
      await approveLoan(loanId);
      alert("Loan approved.");
      // Refresh loan applications
    } catch (error) {
      console.error("Error approving loan:", error);
    }
  };

  return (
    <div className="p-6 bg-base-100 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Loan Panel</h2>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id} className="mb-4">
            <p>
              <strong>User:</strong> {loan.userId}
            </p>
            <p>
              <strong>Amount:</strong> ${loan.amount}
            </p>
            <button
              onClick={() => handleApprove(loan.id)}
              className="btn btn-primary mt-2"
            >
              Approve Loan
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
