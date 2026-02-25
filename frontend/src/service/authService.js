import AxiosInstance from "../api/axiosInstance.js";

export const Login = async (data) => {
  const response = await AxiosInstance.post("/auth/login", data);
  return response.data;
};

export const createAccount = async (data) => {
  const response = await AxiosInstance.post("/auth/signup", data);
  return response.data;
};

export const sendOtp = async (data) => {
  const response = await AxiosInstance.post("/auth/otp/send", data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await AxiosInstance.post("/auth/reset-password", data);
  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await AxiosInstance.post("/auth/otp/verify", data);
  return response.data;
};