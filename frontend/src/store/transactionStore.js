import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast, showSuccessToast } from "../components/common/Toast";

const useTransactionStore = create((set) => ({}));

export default useTransactionStore;
