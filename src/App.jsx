import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoanForm from "./components/LoanForm";
import HomePage from "./pages/HomePage";
import LoanStatus from "./components/LoanStatus";
import DashBoard from "./components/DashBoard";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/loginPage";
import { AuthProvider, useAuth } from "./utils/useAuth";
import AdminPage from "./pages/AdminPage";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth(); // Access authentication state
  return auth ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loanForm"
            element={
              <ProtectedRoute>
                <LoanForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loanForm"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <LoanForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loanStatus"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <LoanStatus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
