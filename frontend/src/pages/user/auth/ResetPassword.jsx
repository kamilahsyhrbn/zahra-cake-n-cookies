import React, { useState } from "react";
import { TitleDesc } from "../../../components/pages/user/TitleDesc";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { showSuccessToast } from "../../../components/common/Toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetPassword, isLoading } = useAuthStore();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Memeriksa apakah kata sandi memiliki minimal 6 karakter
    if (name === "password") {
      if (value.length < 6) {
        setErrorMessage("Kata sandi harus memiliki minimal 6 karakter.");
      } else {
        setErrorMessage("");
      }
    }

    // Memeriksa apakah kata sandi dan konfirmasi kata sandi sama
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setErrorMessage("Kata sandi dan konfirmasi kata sandi harus sama.");
      } else {
        setErrorMessage("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Memeriksa apakah semua field telah diisi
    if (!formData.password || !formData.confirmPassword) {
      setErrorMessage("Semua field harus diisi.");
      return;
    }

    // Memeriksa apakah kata sandi dan konfirmasi kata sandi sama
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Kata sandi dan konfirmasi kata sandi harus sama.");
      return;
    }

    // Memeriksa apakah kata sandi memiliki minimal 6 karakter
    if (formData.password.length < 6) {
      setErrorMessage("Kata sandi harus memiliki minimal 6 karakter.");
      return;
    }

    const response = await resetPassword(token, formData.password);
    if (response.success) {
      showSuccessToast("Kata sandi berhasil diatur ulang.");
      navigate("/login");
    } else {
      setErrorMessage(response.response.data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="container mb-10">
      <TitleDesc
        title="Atur Ulang Kata Sandi"
        desc="Masukkan kata sandi baru Anda untuk mengatur ulang kata sandi."
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 justify-center items-center"
      >
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Kata Sandi
            </label>
            <input
              type={showPassword.password ? "text" : "password"}
              id="password"
              placeholder="Masukkan kata sandi Anda"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("password")}
              className="absolute inset-y-11 right-3 flex items-center text-gray-500 hover:text-[#1D6F64] cursor-pointer"
            >
              {showPassword.password ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <label
              htmlFor="Confirm password"
              className="block text-sm font-medium mb-1"
            >
              Konfirmasi Kata Sandi
            </label>
            <input
              type={showPassword.confirm ? "text" : "password"}
              id="confirmPassword"
              placeholder="Masukkan kata sandi Anda"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute inset-y-11 right-3 flex items-center text-gray-500 hover:text-[#1D6F64] cursor-pointer"
            >
              {showPassword.confirm ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>

          {errorMessage && (
            <div className="mb-5">
              <p className="text-red-500 text-sm sm:text-base lg:text-sm">
                {errorMessage} Silakan coba lagi.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#1D6F64] hover:bg-[#2a4d48] mt-2 focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl w-full px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer disabled:bg-[#1D6F64]/50"
          >
            Atur Ulang
          </button>
        </div>
      </form>
    </div>
  );
};
