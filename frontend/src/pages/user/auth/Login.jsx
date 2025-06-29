import React, { useState } from "react";
import { TitleDesc } from "../../../components/pages/user/TitleDesc";
import { Input } from "../../../components/pages/admin/Input";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/common/Toast";
import useAuthStore from "../../../store/authStore";

export const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showErrorToast("Semua field harus diisi");
      return;
    }

    const response = await login(
      formData.email,
      formData.password,
      formData.role
    );

    if (response?.success) {
      showSuccessToast(
        `Berhasil masuk, selamat datang kembali, ${response.data.user.name}!`
      );

      setFormData({
        email: "",
        password: "",
        role: "user",
      });

      navigate("/");
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="container mb-10">
      <TitleDesc
        title="Login"
        desc="Masuk ke akun Anda untuk mengakses semua fitur dan layanan kami dengan mudah."
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
            value={formData.email}
            onChange={handleChange}
          />
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Kata Sandi
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Masukkan kata sandi Anda"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-11 right-3 flex items-center text-gray-500 hover:text-[#1D6F64] cursor-pointer"
            >
              {showPassword ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>

          <Link to="/forgot-password">
            <p className="text-right text-sm text-gray-500 hover:underline">
              Lupa kata sandi?
            </p>
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#1D6F64] hover:bg-[#2a4d48] mt-2 focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl w-full px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer disabled:bg-[#1D6F64]/50"
          >
            Login
          </button>
        </div>

        <p className="text-sm">
          Belum memiliki akun?{" "}
          <Link to="/register" className="text-[#1D6F64] hover:underline">
            Daftar
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
