import React, { useEffect, useState } from "react";
import { getLoanStatus } from "../services/LoanService"; // Adjust the service to fetch the correct loan data for the dashboard
import { useAuth } from "../utils/useAuth"; // Authentication hook

const DashBoard = () => {
  const { auth } = useAuth(); // Get user authentication data
  const [loans, setLoans] = useState([]); // State to hold loan data
  const [loading, setLoading] = useState(true); // Loading state to show loading message

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const userId = auth.user.id; // Get the user ID from auth
        const response = await getLoanStatus(userId); // Fetch loan data for this user
        setLoans(response.data); // Set the loan data into the state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching loan details:", error);
        setLoading(false); // Stop loading even if there is an error
      }
    };

    if (auth && auth.user && auth.user.id) {
      fetchLoanDetails(); // Fetch loan details when the component mounts
    }
  }, [auth]);

  if (loading) {
    return <p>Loading loan details...</p>; // Show loading message while waiting for data
  }

  return (
    <div className="p-6 bg-base-100 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Your Loan Details</h2>
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

export default DashBoard;
