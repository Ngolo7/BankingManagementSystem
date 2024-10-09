import axios from "axios";

export const login = (credentials) => {
  return axios.post("/api/auth/login", credentials);
};
