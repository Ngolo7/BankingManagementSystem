import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// AuthProvider component that wraps the application
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // Set default value for auth (null)

  const logout = () => setAuth(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
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
