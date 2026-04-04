import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const loginUser = (data) => {
  return axios.post(`${API_URL}/login`, data);
};

export const googleLogin = (data) => {
  return axios.post(`${API_URL}/google`, data);
};