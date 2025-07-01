import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";

const useUserStore = create((set) => ({
  admins: [],
  users: [],
  user: null,
  isLoading: false,
  isUserLoading: false,

  getAllAdmins: async () => {
    set({ isLoading: true, admins: [] });
    try {
      const response = await api.get("/user/admin");
      set({ admins: response?.data });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  getAllUsers: async () => {
    set({ isLoading: true, users: [] });
    try {
      const response = await api.get("/user");
      set({ users: response?.data });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  getUserById: async (id) => {
    set({ isUserLoading: true, user: null });
    try {
      const response = await api.get(`/user/${id}`);
      set({ user: response?.data });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isUserLoading: false });
    }
  },

  updateUser: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await api.put(`/user/${id}`, data);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteUser: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.delete(`/user/${id}`);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
