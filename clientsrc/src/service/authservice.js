import axios from "axios";
import BASE_URL from "../api";

const API_URL = `${BASE_URL}/api/auth`;

export const loginUser = (data) => {
  return axios.post(`${API_URL}/login`, data);
};

export const googleLogin = (data) => {
  return axios.post(`${API_URL}/google`, data);
};

