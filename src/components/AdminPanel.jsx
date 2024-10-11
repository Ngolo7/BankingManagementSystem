import React, { useEffect, useState } from "react";
import { getLoanApplications, approveLoan } from "../services/LoanService";
import { useAuth } from "../utils/useAuth";

const AdminPanel = () => {
  const { auth } = useAuth(); // Access authentication state
  const [loans, setLoans] = useState([]); // Initialize loans state to store loan data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await getLoanApplications();
        setLoans(response.data); // Set the loans data from the response
        setLoading(false); // Set loading to false when the data is fetched
      } catch (error) {
        console.error("Error fetching loan applications:", error);
        setLoading(false); // Stop loading even in case of error
      }
    };

    fetchLoans();
  }, []);

  const handleLoanAction = async (loanId, status) => {
    try {
      await approveLoan(loanId, status);
      alert(`Loan ${status.toLowerCase()}ed.`);
      // Refresh loans after the action
      const response = await getLoanApplications();
      setLoans(response.data);
    } catch (error) {
      alert(`Error ${status.toLowerCase()}ing loan.`);
    }
  };

  if (loading) {
    return <p>Loading loan applications...</p>; // Display a loading message
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Loan Panel</h2>
      <div>
        <h3 className="text-lg font-bold">Admin Profile:</h3>
        <p>
          <strong>Username:</strong> {auth.user.username}
        </p>
        <p>
          <strong>Role:</strong> {auth.user.role}
        </p>
      </div>

      {loans.length > 0 ? (
        <ul className="mt-4">
          {loans.map((loan) => (
            <li key={loan.loanId} className="mb-4">
              <p>
                <strong>User:</strong> {loan.userId}
              </p>
              <p>
                <strong>Amount:</strong> ${loan.amount}
              </p>
              <p>
                <strong>Status:</strong> {loan.status}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleLoanAction(loan.loanId, "Approved")}
                  className="btn btn-success mt-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleLoanAction(loan.loanId, "Rejected")}
                  className="btn btn-danger mt-2"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No loan applications found.</p>
      )}
    </div>
  );
};

export default AdminPanel;
