import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";

const useTransactionStore = create((set) => ({
  isLoading: false,

  updateTransactionStatus: async (orderId) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/transaction/${orderId}/status-update`);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  webHookMidtrans: async (notification) => {
    set({ isLoading: true });
    try {
      const response = await api.post(
        "/transaction/midtrans-callback",
        notification
      );
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useTransactionStore;
