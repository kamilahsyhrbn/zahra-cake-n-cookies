import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";

const useRajaOngkirStore = create((set) => ({
  provincies: [],
  cities: [],
  shipping: [],
  isLoading: false,

  getProvinces: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/rajaongkir/provinces");
      set({ provincies: response });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  getCities: async (province_id) => {
    set({ isLoading: true });
    try {
      const response = await api.get(
        `/rajaongkir/cities?province_id=${province_id}`
      );
      set({ cities: response });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  getCosts: async (destination, weight) => {
    set({ isLoading: true });
    try {
      const response = await api.post(
        "/rajaongkir/shipping-cost",
        destination,
        weight
      );
      set({ shipping: response });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useRajaOngkirStore;
