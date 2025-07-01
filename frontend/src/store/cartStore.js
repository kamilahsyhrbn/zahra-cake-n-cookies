import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast, showSuccessToast } from "../components/common/Toast";

const useCartStore = create((set) => ({
  carts: [],
  isLoading: false,

  getCarts: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/cart");
      set({ carts: response.data });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/cart", data);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCartStore;
