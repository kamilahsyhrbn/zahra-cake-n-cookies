import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "./tokenManager";
import { showErrorToast } from "../components/common/Toast";

export const protectedRoute = ({ children, role }) => {
  const { getCurrentUser, currentUser } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getCurrentUser();
      } finally {
        setIsChecking(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    setIsChecking(true);
    const token = getAccessToken();

    if (!isChecking) {
      if (!token) {
        showErrorToast("Anda harus masuk terlebih dahulu");
        navigate("/");
      } else if (role && currentUser && currentUser.role !== role) {
        showErrorToast("Anda tidak memiliki akses ke halaman ini");
        if (currentUser.role === "admin") {
          navigate("/admin/dashboard");
        } else if (currentUser.role === "user") {
          navigate("/");
        }
      }
    }
  }, [isChecking]);

  return children;
};

export default protectedRoute;
