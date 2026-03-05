import axios from "axios";
const API = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: `${API}`, // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
