import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import {
  decodeToken,
  getAccessToken,
  removeAccessToken,
  saveAccessToken,
} from "../utils/tokenManager";

const useAuthStore = create((set) => ({
  currentUser: null,
  isLoading: false,

  getCurrentUser: async () => {
    set({ isLoading: true });
    try {
      const accessToken = getAccessToken();
      if (accessToken) {
        const { exp } = decodeToken(accessToken);
        const now = Math.floor(Date.now() / 1000);

        if (now > exp) {
          removeAccessToken();
          window.location.href = "/";
          set({ currentUser: null });
          return;
        }
      }

      if (!accessToken) {
        set({ currentUser: null });
        return;
      }

      const user = decodeToken(accessToken).id;

      const response = await api.get(`/user/${user}`);
      set({ currentUser: response.data });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password, role) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/auth/login", { email, password, role });
      saveAccessToken(response?.data?.token);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (name, email, phone, password, role) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        phone,
        password,
        role,
      });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  changePassword: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.put(`/auth/change-password`, data);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    removeAccessToken();
    set({ currentUser: null });
  },

  forgotPassword: async (email) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/auth/reset-password/${token}`, {
        password,
      });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
