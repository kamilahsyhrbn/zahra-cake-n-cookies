import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TitleDesc } from "../../../components/pages/user/TitleDesc";
import useAuthStore from "../../../store/authStore";
import { showSuccessToast } from "../../../components/common/Toast";
import { Input } from "../../../components/pages/admin/Input";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { forgotPassword, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Email harus diisi");
      return;
    }

    const response = await forgotPassword(email);
    if (response?.success) {
      showSuccessToast("Tautan atur ulang kata sandi berhasil dikirim ✅");
      navigate("/login");
      setEmail("");
      setErrorMessage("");
    } else {
      setErrorMessage(response.response.data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="container mb-10">
      <TitleDesc
        title="Lupa Kata Sandi"
        desc="Masukkan email Anda untuk mengatur ulang kata sandi Anda."
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 justify-center items-center"
      >
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <Input
            title="Email"
            type="email"
            name="email"
            placeholder="Masukkan email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#1D6F64] hover:bg-[#2a4d48] mt-2 focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl w-full px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer disabled:bg-[#1D6F64]/50"
          >
            Kirim Tautan
          </button>
        </div>
      </form>
    </div>
  );
};
