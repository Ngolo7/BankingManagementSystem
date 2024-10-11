import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api"; // API import
import { useAuth } from "../utils/useAuth"; // Auth context

const LoginPage = () => {
  const { setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the login API function
      const response = await login({ username, password });

      console.log("Login response:", response); // Log the entire response

      // Check if the response contains token and user
      if (response && response.token && response.user) {
        const { token, user } = response;

        console.log("Setting auth with:", token, user);

        setAuth(token, user); // Set authentication state
        localStorage.setItem("token", token); // Store the JWT token in localStorage
        localStorage.setItem("user", JSON.stringify(user)); // Store the user object in localStorage

        setError(""); // Clear any previous error
        // Check if the user is an admin
        if (user.role === "ADMIN") {
          alert("Login successful! Redirecting to Admin Panel...");
          navigate("/admin"); // Redirect to the Admin Panel for admin users
        } else {
          alert("Login successful!");
          navigate("/profile"); // Redirect to the profile page for regular users
        }
      } else {
        throw new Error("Token or user data is missing in the response");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login failed:", err); // Log the error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
          className="input input-bordered w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          className="input input-bordered w-full mb-4"
          required
        />
        <button className="btn btn-primary w-full">Login</button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
