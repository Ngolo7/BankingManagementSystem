import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import LoanForm from "../components/LoanForm";
import LoanStatus from "../components/LoanStatus";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId"); // Remove user ID if stored

    // Redirect to login page or home page
    navigate("/login");
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <div className="flex items-center mb-6">
          <img
            src="https://picsum.photos/100" // Replace with user's profile picture URL
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-sm">Premium User</p>
          </div>
        </div>

        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/dashboard" className="hover:text-gray-400">
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/loanForm" className="hover:text-gray-400">
                Apply for Loan
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/loanStatus" className="hover:text-gray-400">
                Loan Status
              </Link>
            </li>

            <li className="mb-4">
              <Link to="/settings" className="hover:text-gray-400">
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-900 text-white p-6 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-4">Loan Summary</h1>

        {/* Render the selected link content */}
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
