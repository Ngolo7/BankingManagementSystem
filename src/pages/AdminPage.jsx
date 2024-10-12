import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import AdminPanel from "../components/AdminPanel";

const AdminPage = () => {
  const { auth } = useAuth(); // Access authentication state

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Admin Profile</h1>

      {/* Admin Profile Information */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center mb-4">
          <img
            src="https://picsum.photos/100" // Replace with admin's profile picture URL
            alt="Admin Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">{auth.user.username}</h2>
            <p className="text-sm">Role: {auth.user.role}</p>
          </div>
        </div>
      </div>

      {/* Link to the Admin Panel */}
      <div className="mt-6">
        <Link
          to="/admin/panel" // Adjust the route as needed
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Go to Admin Panel
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
