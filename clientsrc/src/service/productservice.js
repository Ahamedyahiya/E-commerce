import axios from "axios";
import BASE_URL from "../api";

const API_URL = `${BASE_URL}/api/product`;

export const getAllProducts = async () => {
  return await axios.get(API_URL);
};

export const getProductById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const createProduct = async (data) => {
  return await axios.post(API_URL, data);
};

export const updateProduct = async (id, data) => {
  return await axios.patch(`${API_URL}/${id}`, data);
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};