import axios from "axios";

const API_BASE_URL = "http://localhost:8081";
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Apply for a loan, including the Authorization header with the JWT token
export const applyForLoan = (data, userId) => {
  return axios.post(`${API_BASE_URL}/api/loans/apply/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`, // Include the JWT token
      "Content-Type": "application/json",
    },
  });
};

// Get loan status, including the Authorization header with the JWT token
export const getLoanStatus = (userId) => {
  return axios.get(`${API_BASE_URL}/api/loans/status/${userId}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`, // Include the JWT token
    },
  });
};

// Get all loan applications for admin, including the Authorization header with the JWT token
export const getLoanApplications = () => {
  return axios.get(`${API_BASE_URL}/api/loans/admin/loans`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`, // Include the JWT token
    },
  });
};

// Approve a loan, including the Authorization header with the JWT token
export const approveLoan = (loanId, status) => {
  return axios.put(
    `${API_BASE_URL}/api/loans/admin/approval/${loanId}?status=${status}`,
    {}, // Pass an empty body if not needed
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Include the JWT token
        "Content-Type": "application/json",
      },
    }
  );
};
