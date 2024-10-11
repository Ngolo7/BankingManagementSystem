import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// AuthProvider component that wraps the application
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // Default value is null

  // Load authentication state from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    console.log("Loaded token:", storedToken);
    console.log("Loaded user:", storedUser);
    // Only parse storedUser if it is not null or undefined
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Safely parse stored user data
        setAuth({ token: storedToken, user: parsedUser });
        console.log("Auth state updated:", {
          token: storedToken,
          user: parsedUser,
        });
      } catch (e) {
        console.error("Error parsing user data from localStorage:", e);
        // You might want to clear invalid data from localStorage if this happens
        localStorage.removeItem("user"); // Clear invalid user data
      }
    }
  }, []);

  const login = (token, user) => {
    // Save token and user data in both state and localStorage
    setAuth({ token, user });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // Save user data as a string in localStorage
  };

  const logout = () => {
    // Clear authentication state and localStorage
    setAuth(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
