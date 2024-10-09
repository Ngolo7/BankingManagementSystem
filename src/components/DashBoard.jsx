import React from "react";

const DashBoard = ({ userData }) => {
  return (
    <div className="p-6 bg-base-100 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Loan Details</h2>
      <p>
        <strong>Loan Amount:</strong> ${userData.loanAmount}
      </p>
      <p>
        <strong>Interest Rate:</strong> {userData.interestRate}%
      </p>
      <p>
        <strong>Tenure:</strong> {userData.tenure} years
      </p>
    </div>
  );
};

export default DashBoard;
