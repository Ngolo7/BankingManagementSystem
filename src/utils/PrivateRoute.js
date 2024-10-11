import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  // Redirect to login if not authenticated
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
