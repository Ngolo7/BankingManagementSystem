import React, { useEffect, useState } from "react";
import { getLoanStatus } from "../services/LoanService";
import { useAuth } from "../utils/useAuth"; // Assuming you have a useAuth hook for authentication
import { useNavigate } from "react-router-dom";

const LoanStatus = () => {
  const { auth } = useAuth(); // Get the authenticated user from context
  const [loans, setLoans] = useState([]); // Initialize the state for loans
  const navigate = useNavigate();

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

  const handleClose = () => {
    navigate("/"); // Navigate to home or main page
  };

  return (
    <div className="p-6 bg-gray-800 text-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Loan Status</h2>
      <button
        onClick={handleClose}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mb-4"
      >
        Close Page
      </button>
      {loans.length > 0 ? (
        <ul>
          {loans.map((loan) => (
            <li
              key={loan.loanId}
              className="mb-6 border-b pb-4 border-gray-600"
            >
              <p className="text-lg mb-2">
                <strong>Loan Type:</strong> {loan.loanType}
              </p>
              <p className="mb-2">
                <strong>Amount:</strong> ${loan.amount}
              </p>
              <p className="mb-2">
                <strong>Interest Rate:</strong> {loan.interestRate}%
              </p>
              <p className="mb-2">
                <strong>Total Amount:</strong> ${loan.totalAmount}
              </p>
              <p className="mb-2">
                <strong>Tenure:</strong> {loan.tenure} years
              </p>
              <p
                className={`font-bold ${
                  loan.status === "Approved"
                    ? "text-green-400"
                    : loan.status === "Rejected"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
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
        <p className="text-center text-gray-400">No loan application found.</p>
      )}
    </div>
  );
};

export default LoanStatus;
