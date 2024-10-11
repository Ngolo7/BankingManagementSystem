import React from "react";
import LoanForm from "../components/LoanForm";
import LoanStatus from "../components/LoanStatus";

const HomePage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to the Loan Management System
      </h1>
      <p>Please log in to manage your loans.</p>
    </div>
  );
};

export default HomePage;
