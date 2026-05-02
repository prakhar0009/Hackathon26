import api from "./axios";

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginBuyer = async (data) => {
  const res = await api.post("/auth/login/buyer", data);
  return res.data;
};

export const loginSeller = async (data) => {
  const res = await api.post("/auth/login/seller", data);
  return res.data;
};
