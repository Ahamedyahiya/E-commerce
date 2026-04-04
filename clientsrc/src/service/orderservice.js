import axios from "axios";
import BASE_URL from "../api";

const API = `${BASE_URL}/api/orders`;

const authConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const placeOrder = async (data) => {
  const res = await axios.post(`${API}/create`, data, authConfig());
  return res.data;
};

export const getAllOrders = async () => {
  const res = await axios.get(API, authConfig());
  return res.data.orders;
};

export const getOrderById = async (id) => {
  const res = await axios.get(`${API}/${id}`, authConfig());
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await axios.put(`${API}/${id}/status`, { status }, authConfig());
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await axios.delete(`${API}/${id}`, authConfig());
  return res.data;
};