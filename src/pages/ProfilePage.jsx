import React from "react";
import { useNavigate } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import { useAuth } from "../utils/useAuth";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth(); // Get auth data from context

  console.log("Auth state in ProfilePage:", auth);

  // Check if auth and user data exist
  if (!auth || !auth.user) {
    return <p>Loading profile...</p>; // Show loading state if no user data is available
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {auth.user.username}</h1>
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => navigate("/loanForm")}
          className="btn btn-primary"
        >
          Apply for a Loan
        </button>
        <button
          onClick={() => navigate("/loanStatus")}
          className="btn btn-secondary"
        >
          Check Loan Status
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-accent"
        >
          View Dashboard
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
