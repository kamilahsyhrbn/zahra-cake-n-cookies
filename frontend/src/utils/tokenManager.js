import { jwtDecode } from "jwt-decode";

export const saveAccessToken = (token) => {
  localStorage.setItem("token", token);
};

export const getAccessToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const removeAccessToken = () => {
  localStorage.removeItem("token");
};

export const decodeToken = (token) => {
  return jwtDecode(token);
};
