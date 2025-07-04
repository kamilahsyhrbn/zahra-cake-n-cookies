import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast, showSuccessToast } from "../components/common/Toast";

const useReviewStore = create((set) => ({
  reviews: [],
  isLoading: false,

  getAllReviews: async (id, sort, rating) => {
    set({ isLoading: true });
    try {
      const response = await api.get(
        `/review?id=${id}${sort ? `&sort=${sort}` : ""}${
          rating ? `&rating=${rating}` : ""
        }`
      );
      set({ reviews: response.data });
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  createReview: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/review", data);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteReview: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.delete(`/review/${id}`);
      return response;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useReviewStore;
