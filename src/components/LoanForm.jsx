import React, { useState } from "react";
import { applyForLoan } from "../services/LoanService";
import { useAuth } from "../utils/useAuth"; // To access the authenticated user
import { useNavigate } from "react-router-dom";

const LoanForm = () => {
  const [formData, setFormData] = useState({
    loanType: "",
    amount: "",
    tenure: "",
    interestRate: "", // Added interestRate
  });

  const { auth } = useAuth(); // Get the authenticated user's details (including userId)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pass formData and the user's ID to applyForLoan
      const response = await applyForLoan(formData, auth.user.id);
      alert("Loan application submitted successfully.");
    } catch (error) {
      console.error("Error applying for loan:", error);
      alert("Error applying for loan.");
    }
  };
  const handleClose = () => {
    navigate("/"); // Navigate to home or main page
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 shadow-lg rounded-lg text-white"
    >
      <h2 className="text-xl font-bold mb-4">Apply for a Loan</h2>
      <button
        onClick={handleClose}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mb-4"
      >
        Close Page
      </button>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Loan Type</label>
        <input
          type="text"
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
          className="input bg-gray-700 text-white p-2 w-full rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="input bg-gray-700 text-white p-2 w-full rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Tenure (Years)</label>
        <input
          type="number"
          name="tenure"
          value={formData.tenure}
          onChange={handleChange}
          className="input bg-gray-700 text-white p-2 w-full rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">
          Interest Rate (%)
        </label>
        <input
          type="number"
          name="interestRate"
          value={formData.interestRate}
          onChange={handleChange}
          className="input bg-gray-700 text-white p-2 w-full rounded-lg"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
      >
        Submit Application
      </button>
    </form>
  );
};

export default LoanForm;
