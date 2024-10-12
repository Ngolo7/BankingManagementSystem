import React from "react";
import { useNavigate } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import { useAuth } from "../utils/useAuth";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth(); // Get auth data from context

  // Dummy profile picture URL (you can use any random image source)
  const profilePictureUrl =
    auth.user.profilePicture || "https://picsum.photos/150"; // Random image from Picsum

  return (
    <div className="container mx-auto p-6 flex">
      <div className="flex-shrink-0 mr-6">
        <img
          src={profilePictureUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full"
        />
      </div>

      <div className="flex flex-col justify-center items-start flex-1">
        <div className="flex flex-col justify-center items-start flex-1">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-3xl font-bold mb-4 text-white">Profile</h1>
            <p className="text-gray-300">
              <strong>Username:</strong> {auth.user.username}
            </p>
            <p className="text-gray-300">
              <strong>Role:</strong> {auth.user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
