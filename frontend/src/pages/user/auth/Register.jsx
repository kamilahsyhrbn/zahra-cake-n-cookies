import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TitleDesc } from "../../../components/pages/user/TitleDesc";
import { Input } from "../../../components/pages/admin/Input";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useAuthStore from "../../../store/authStore";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/common/Toast";

export const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Memfilter input berdasarkan jenis field
    let filteredValue = value;
    if (name === "name") {
      // Hanya izinkan huruf dan spasi
      filteredValue = value.replace(/[^A-Za-z\s]/g, "").slice(0, 50);
    }

    if (name === "phone") {
      // Hanya izinkan angka dan batasi hingga 16 digit
      filteredValue = value.replace(/\D/g, "").slice(0, 16);
    }

    // Perbarui formData
    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      showErrorToast("Semua field harus diisi");
      return;
    }

    // Memeriksa apakah nama terdiri dari minimal 3 karakter
    if (formData.name.length < 3) {
      setErrorMessage("Nama harus memiliki minimal 3 karakter.");
      return;
    }

    // Memeriksa apakah nomor telepon terdiri dari minimal 10 angka dan maksimal 16
    if (formData.phone.length < 10 || formData.phone.length > 16) {
      setErrorMessage("Nomor telepon harus memiliki minimal 10 angka.");
      return;
    }

    // Memeriksa apakah email memiliki format yang benar
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Format email tidak valid.");
      return;
    }

    // Memeriksa apakah kata sandi memiliki minimal 6 karakter
    if (formData.password.length < 6) {
      setErrorMessage("Kata sandi harus memiliki minimal 6 karakter.");
      return;
    }

    // Memeriksa apakah kata sandi dan konfirmasi kata sandi sama
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Kata sandi dan konfirmasi kata sandi harus sama.");
      return;
    }

    const response = await register(
      formData.name,
      formData.email,
      formData.phone,
      formData.password,
      formData.role
    );

    if (response?.success) {
      showSuccessToast("Berhasil membuat akun baru");
      navigate("/login");

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "user",
      });

      setErrorMessage("");
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
      setErrorMessage(response.response.data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="container mb-10">
      <TitleDesc
        title="Register"
        desc="Buat akun baru sekarang dan nikmati layanan kami tanpa batas."
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 justify-center items-center"
      >
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <Input
            title="Nama Lengkap"
            type="text"
            name="name"
            placeholder="Masukkan nama lengkap Anda"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            title="Nomor HP"
            type="tel"
            name="phone"
            placeholder="Masukkan nomor HP Anda"
            value={formData.phone}
            onChange={handleChange}
          />

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
            Daftar
          </button>
        </div>

        <p className="text-sm">
          Sudah memiliki akun?{" "}
          <Link to="/login" className="text-[#1D6F64] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
