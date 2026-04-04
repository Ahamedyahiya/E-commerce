import axios from "axios";

const BASE_URL = "http://localhost:8080/api/cart";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET CART
export const getCart = async () => {
  const res = await axios.get(BASE_URL, getAuthHeader());
  return res.data;
};

// ADD TO CART
export const addToCart = async (product) => {
  const res = await axios.post(BASE_URL, product, getAuthHeader());
  return res.data;
};

// UPDATE QTY (FIXED)
export const updateCartQty = async (id, quantity) => {
  const res = await axios.put(
    `${BASE_URL}/${id}`,
    { quantity },
    getAuthHeader()
  );
  return res.data;
};

// DELETE ITEM
export const deleteCartItem = async (id) => {
  const res = await axios.delete(
    `${BASE_URL}/${id}`,
    getAuthHeader()
  );
  return res.data;
};