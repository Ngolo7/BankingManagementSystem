import React, { useState } from "react";
import { applyForLoan } from "../services/LoanService";
import { useAuth } from "../utils/useAuth"; // To access the authenticated user

const LoanForm = () => {
  const [formData, setFormData] = useState({
    loanType: "",
    amount: "",
    tenure: "",
    interestRate: "", // Added interestRate
  });

  const { auth } = useAuth(); // Get the authenticated user's details (including userId)

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

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Apply for a Loan</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Loan Type</label>
        <input
          type="text"
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
          className="input input-bordered w-full"
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
          className="input input-bordered w-full"
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
          className="input input-bordered w-full"
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
          className="input input-bordered w-full"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Application
      </button>
    </form>
  );
};

export default LoanForm;
