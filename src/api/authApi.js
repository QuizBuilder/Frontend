import axiosInstance from "./axios";

export const loginUser = async (data) => {
  const response = await axiosInstance.post("/auth/signin", data);
  return response.data;
};

export const signupUser = async (data) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response.data;
};