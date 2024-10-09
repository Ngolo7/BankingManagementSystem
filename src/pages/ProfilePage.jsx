import React from "react";
import DashBoard from "../components/DashBoard"; // Corrected the file name
import { useAuth } from "../utils/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      {user ? <DashBoard userData={user} /> : <p>Loading...</p>} // Updated the
      component name
    </div>
  );
};

export default ProfilePage;
