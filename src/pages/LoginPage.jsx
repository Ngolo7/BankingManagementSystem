import React, { useState } from "react";
import { login } from "../api"; // API import
import { useAuth } from "../utils/useAuth"; // Auth context

const LoginPage = () => {
  const { setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the login API function
      const response = await login({ username, password });

      // Check the response structure and make sure 'token' is present
      if (response && response.token) {
        const { token, user } = response;

        setAuth({ token, user }); // Set authentication state
        localStorage.setItem("token", token); // Store the JWT token in localStorage

        setError(""); // Clear any previous error
        alert("Login successful!");
      } else {
        throw new Error("Token is missing in the response");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login failed:", err); // Log the error
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default LoginPage;
