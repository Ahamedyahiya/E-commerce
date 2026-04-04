import axios from "axios";
import BASE_URL from "../api";

const BASE_URL_CART = `${BASE_URL}/api/cart`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getCart = async () => {
  const res = await axios.get(BASE_URL_CART, getAuthHeader());
  return res.data;
};

export const addToCart = async (product) => {
  const res = await axios.post(BASE_URL_CART, product, getAuthHeader());
  return res.data;
};

export const updateCartQty = async (id, quantity) => {
  const res = await axios.put(`${BASE_URL_CART}/${id}`, { quantity }, getAuthHeader());
  return res.data;
};

export const deleteCartItem = async (id) => {
  const res = await axios.delete(`${BASE_URL_CART}/${id}`, getAuthHeader());
  return res.data;
};