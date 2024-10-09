import axios from "axios";

export const applyForLoan = (data) => {
  return axios.post("/api/loans/apply", data);
};

export const getLoanStatus = () => {
  return axios.get("/api/loans/status");
};

export const getLoanApplications = () => {
  return axios.get("/api/admin/loans");
};

export const approveLoan = (loanId) => {
  return axios.put(`/api/admin/loans/approve/${loanId}`);
};
