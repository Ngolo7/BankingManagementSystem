import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/loginPage"; // Corrected file name
import { AuthProvider, useAuth } from "./utils/useAuth";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth(); // useAuth hook is now within the AuthProvider
  return auth ? children : <LoginPage />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
