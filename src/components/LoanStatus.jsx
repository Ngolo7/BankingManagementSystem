import React, { useEffect, useState } from "react";
import { getLoanStatus } from "../services/LoanService";

const LoanStatus = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await getLoanStatus();
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching loan status:", error);
      }
    };
    fetchStatus();
  }, []);

  return (
    <div className="p-6 bg-base-100 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Loan Status</h2>
      <p>
        {status
          ? `Your loan is currently ${status}`
          : "No loan application found."}
      </p>
    </div>
  );
};

export default LoanStatus;
