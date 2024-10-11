import React, { useEffect, useState } from "react";
import { getLoanStatus } from "../services/LoanService";
import { useAuth } from "../utils/useAuth"; // Assuming you have a useAuth hook for authentication

const LoanStatus = () => {
  const { auth } = useAuth(); // Get the authenticated user from context
  const [loans, setLoans] = useState([]); // Initialize the state for loans

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // Ensure userId is passed from the auth state
        const userId = auth.user.id; // Extract the userId from auth object
        const response = await getLoanStatus(userId); // Pass userId to the service
        setLoans(response.data); // Update loans state with the response data
      } catch (error) {
        console.error("Error fetching loan status:", error);
      }
    };

    if (auth && auth.user && auth.user.id) {
      fetchStatus(); // Only fetch if the user is authenticated
    }
  }, [auth]);

  return (
    <div className="p-6 bg-base-100 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Loan Status</h2>
      {loans.length > 0 ? (
        <ul>
          {loans.map((loan) => (
            <li key={loan.loanId} className="mb-4">
              <p>
                <strong>Loan Type:</strong> {loan.loanType}
              </p>
              <p>
                <strong>Amount:</strong> ${loan.amount}
              </p>
              <p>
                <strong>Interest Rate:</strong> {loan.interestRate}%
              </p>
              <p>
                <strong>Total Amount:</strong> ${loan.totalAmount}
              </p>
              <p>
                <strong>Tenure:</strong> {loan.tenure} years
              </p>
              <p>
                <strong>Status:</strong> {loan.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No loan application found.</p>
      )}
    </div>
  );
};

export default LoanStatus;
