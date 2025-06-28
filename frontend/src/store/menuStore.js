import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast, showSuccessToast } from "../components/common/Toast";

const useMenuStore = create((set) => ({
  menus: [],
  selectedMenu: null,
  isLoading: false,

  getAllMenus: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/menu");
      set({ menus: response?.data });
      return response;
    } catch (error) {
      showErrorToast(error.response.data.message || "Terjadi kesalahan");
    } finally {
      set({ isLoading: false });
    }
  },

  getMenuById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/menu/${id}`);
      set({ selectedMenu: response.data });
      return response;
    } catch (error) {
      showErrorToast(error.response.data.message || "Terjadi kesalahan");
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
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useMenuStore;
