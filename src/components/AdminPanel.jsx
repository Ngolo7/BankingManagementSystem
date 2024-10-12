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
  // Separate loans by status
  const pendingLoans = loans.filter((loan) => loan.status === "Pending");
  const approvedLoans = loans.filter((loan) => loan.status === "Approved");
  const rejectedLoans = loans.filter((loan) => loan.status === "Rejected");

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      {/* Pending Loan Applications */}
      <h3 className="text-lg font-bold mt-6 text-gray-400">
        Pending Loan Applications:
      </h3>
      {pendingLoans.length > 0 ? (
        <div className="min-w-full bg-gray-800 text-white rounded-lg mb-6">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">User</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingLoans.map((loan) => (
                <tr key={loan.loanId} className="hover:bg-gray-700">
                  <td className="py-2 px-4">{loan.userId}</td>
                  <td className="py-2 px-4">${loan.amount}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button
                      onClick={() => handleLoanAction(loan.loanId, "Approved")}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleLoanAction(loan.loanId, "Rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400">No pending loan applications found.</p>
      )}

      {/* Approved Loan Applications */}
      <h3 className="text-lg font-bold mt-6 text-gray-400">
        Approved Loan Applications:
      </h3>
      {approvedLoans.length > 0 ? (
        <div className="min-w-full bg-gray-800 text-white rounded-lg mb-6">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">User</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Date Approved </th>
              </tr>
            </thead>
            <tbody>
              {approvedLoans.map((loan) => (
                <tr key={loan.loanId} className="hover:bg-gray-700">
                  <td className="py-2 px-4">{loan.userId}</td>
                  <td className="py-2 px-4">${loan.amount}</td>
                  <td className="py-2 px-4">{loan.approvalDate || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400">No approved loan applications found.</p>
      )}

      {/* Rejected Loan Applications */}
      <h3 className="text-lg font-bold mt-6 text-gray-400">
        Rejected Loan Applications:
      </h3>
      {rejectedLoans.length > 0 ? (
        <div className="min-w-full bg-gray-800 text-white rounded-lg mb-6">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">User</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Date Rejected</th>
              </tr>
            </thead>
            <tbody>
              {rejectedLoans.map((loan) => (
                <tr key={loan.loanId} className="hover:bg-gray-700">
                  <td className="py-2 px-4">{loan.userId}</td>
                  <td className="py-2 px-4">${loan.amount}</td>
                  <td className="py-2 px-4">{loan.rejectionDate || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400">No rejected loan applications found.</p>
      )}
    </div>
  );
};
export default AdminPanel;
