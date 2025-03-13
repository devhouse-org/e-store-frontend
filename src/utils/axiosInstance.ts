import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  // timeout: 10000, // 10 seconds timeout
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  // },
  // withCredentials: true, // Enable sending cookies in cross-origin requests
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("session_id");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error("Network Error: Please check if the backend server is running and accessible");
    } else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No Response Error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
