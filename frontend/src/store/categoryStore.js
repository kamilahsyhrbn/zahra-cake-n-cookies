import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";

const useCategoryStore = create((set) => ({
  categories: [],
  category: null,
  isLoading: false,

  getAllCategories: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/category");
      set({ categories: response?.data });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  getCategoryById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/category/${id}`);
      set({ category: response?.data });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  createCategory: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/category", data);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateCategory: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await api.put(`/category/${id}`, data);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.delete(`/category/${id}`);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCategoryStore;
