import axios from "axios";
import { getAccessToken, removeAccessToken } from "../utils/tokenManager";

const config = {
  baseURL: import.meta.env.VITE_SERVER_URL,
};

export const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.data.message === "Token tidak valid.") {
      removeAccessToken();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
