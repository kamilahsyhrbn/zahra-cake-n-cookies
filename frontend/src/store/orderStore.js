import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";

const useOrderStore = create((set) => ({
  orders: [],
  order: null,
  reportResult: [],
  isLoading: false,
  isOrderLoading: false,

  createOrder: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/order", data);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  getOrders: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/order");
      set({ orders: response.data });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  getOrderById: async (id) => {
    set({ isLoading: true, order: null });
    try {
      const response = await api.get(`/order/${id}`);
      set({ order: response.data });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  getUserOrder: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/order/user");
      set({ orders: response.data });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateOrder: async (id, data) => {
    set({ isOrderLoading: true });
    try {
      const response = await api.put(`/order/${id}`, data);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isOrderLoading: false });
    }
  },

  deleteOrder: async (id) => {
    set({ isOrderLoading: true });
    try {
      const response = await api.delete(`/order/${id}`);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isOrderLoading: false });
    }
  },

  report: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/order/report", data);
      set({ reportResult: response.data });
      return response;
    } catch (error) {
      console.log("error", error);
      return error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useOrderStore;
