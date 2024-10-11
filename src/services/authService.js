import axios from "axios";

export const login = (credentials) => {
  return axios.post("http://localhost:8081/api/user/login", credentials);
};
