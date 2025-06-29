import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast } from "../components/common/Toast";

const useMenuStore = create((set) => ({
  menus: [],
  bestSelling: [],
  selectedMenu: null,
  isLoading: false,

  getAllMenus: async ({ category, sort }) => {
    set({ isLoading: true, menus: [] });
    try {
      const endpoint = `/menu?${category ? `category=${category}` : ""}${
        category && sort ? "&" : ""
      }${sort ? `sort=${sort}` : ""}`;
      const response = await api.get(endpoint);
      set({ menus: response?.data });
      return response;
    } catch (error) {
      showErrorToast(error.response.data.message || "Terjadi kesalahan");
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  getMenuById: async (id) => {
    set({ isLoading: true, selectedMenu: null });
    try {
      const response = await api.get(`/menu/${id}`);
      set({ selectedMenu: response.data });
      return response;
    } catch (error) {
      showErrorToast(error.response.data.message || "Terjadi kesalahan");
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  createMenu: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/menu", data);
      return response;
    } catch (error) {
      showErrorToast(error.response.data.message || "Terjadi kesalahan");
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateMenu: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await api.put(`/menu/${id}`, data);
      return response;
    } catch (error) {
      showErrorToast(error.response.data.message || "Terjadi kesalahan");
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteMenu: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.delete(`/menu/${id}`);
      return response;
    } catch (error) {
      showErrorToast(error.response.data.message || "Terjadi kesalahan");
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  searchMenu: async (query) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/menu/search?query=${query}`);
      set({ menus: response.data });
      return response;
    } catch (error) {
      showErrorToast(error.response.data.message || "Terjadi kesalahan");
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  getBestSelling: async () => {
    set({ isLoading: true, bestSelling: [] });
    try {
      const response = await api.get("/menu/best-selling");
      set({ bestSelling: response.data });
      return response;
    } catch (error) {
      showErrorToast(error.response.data.message || "Terjadi kesalahan");
      return error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useMenuStore;
