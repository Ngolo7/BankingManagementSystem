import React, { useState } from "react";
import { applyForLoan } from "../services/LoanService";

const LoanForm = () => {
  const [formData, setFormData] = useState({
    loanType: "",
    amount: "",
    tenure: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyForLoan(formData);
      alert("Loan application submitted successfully.");
    } catch (error) {
      console.error("Error applying for loan:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-base-100 shadow-md rounded-lg"
    >
      <h2 className="text-xl font-bold mb-4">Apply for Loan</h2>
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
      <button type="submit" className="btn btn-primary">
        Submit Application
      </button>
    </form>
  );
};

export default LoanForm;
