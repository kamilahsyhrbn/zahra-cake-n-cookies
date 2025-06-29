import React, { useState } from "react";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/common/Toast";

export const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
        role: "admin",
      });

      navigate("/admin/dashboard");
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-lg w-full">
        <div className="bg-primary rounded-lg shadow-xl overflow-hidden mx-4">
          <div className="p-8">
            <h2 className="text-center text-2xl font-extrabold text-white">
              Admin Zahra Cake & Cookies
            </h2>
            <p className="mt-4 text-center text-white">
              Masuk untuk melanjutkan
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    placeholder="Email"
                    className="appearance-none relative block w-full px-3 py-3 border bg-amber-50 rounded-md focus:outline-none focus:ring-none focus:border-amber-300 focus:z-10 sm:text-sm"
                    required=""
                    autoComplete="email"
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
                  <input
                    placeholder="Kata Sandi"
                    className="appearance-none relative block w-full px-3 py-3 border bg-amber-50 rounded-md focus:outline-none focus:ring-none focus:border-amber-300 focus:z-10 sm:text-sm"
                    required=""
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-secondary focus:outline-none focus:ring-2 cursor-pointer"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-4 bg-accent text-center">
            <p className="text-slate-100">&copy; 2025 Zahra Cake & Cookies</p>
          </div>
        </div>
      </div>
    </div>
  );
};
