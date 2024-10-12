import React, { useEffect, useState } from "react";
import { getLoanStatus } from "../services/LoanService"; // Adjust the service to fetch the correct loan data for the dashboard
import { useAuth } from "../utils/useAuth"; // Authentication hook
import { useNavigate } from "react-router-dom"; // Navigation hook

const DashBoard = () => {
  const { auth } = useAuth(); // Get user authentication data
  const [loans, setLoans] = useState([]); // State to hold loan data
  const [loading, setLoading] = useState(true); // Loading state to show loading message
  const navigate = useNavigate();

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
  const handleClose = () => {
    navigate("/"); // Navigate to home or main page
  };

  if (loading) {
    return <p>Loading loan details...</p>; // Show loading message while waiting for data
  }

  return (
    <div className="p-6 bg-gray-900 text-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Your Loan Details</h2>
      <button
        onClick={handleClose}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mb-4"
      >
        Close Page
      </button>
      {loans.length > 0 ? (
        <ul className="space-y-4">
          {loans.map((loan) => (
            <li key={loan.loanId} className="bg-gray-800 p-4 rounded-lg">
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
              <p>
                <strong>Approval Date:</strong>{" "}
                {loan.approvalDate
                  ? new Date(loan.approvalDate).toLocaleString()
                  : "N/A"}
              </p>
              <p>
                <strong>Rejection Date:</strong>{" "}
                {loan.rejectionDate
                  ? new Date(loan.rejectionDate).toLocaleString()
                  : "N/A"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No loan applications found.</p>
      )}
    </div>
  );
};

export default DashBoard;
