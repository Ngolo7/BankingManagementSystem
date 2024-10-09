import React from "react";
import LoanForm from "../components/LoanForm";
import LoanStatus from "../components/LoanStatus";

const HomePage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Loan Management</h1>
      <LoanForm />
      <LoanStatus />
    </div>
  );
};

export default HomePage;
