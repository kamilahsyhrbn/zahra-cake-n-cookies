import React, { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

export const publicOnlyRoute = ({ children }) => {
  const { getCurrentUser, currentUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      await getCurrentUser();
      if (currentUser && currentUser?.role === "user") {
        navigate("/");
      } else if (currentUser && currentUser?.role === "admin") {
        navigate("/admin/dashboard");
      }
    };
    check();
  }, [currentUser, navigate, getCurrentUser]);
  return children;
};

export default publicOnlyRoute;
