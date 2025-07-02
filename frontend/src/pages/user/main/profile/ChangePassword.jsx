import React, { useState } from "react";
import { SideMenu } from "../../../../components/pages/user/SideMenu";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../../store/authStore";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common/Toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { changePassword, isLoading } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (field, value) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));

    // Memeriksa apakah kata sandi memiliki minimal 6 karakter
    if (field === "newPassword") {
      if (value.length < 6 || value.trim() === "") {
        setErrorMessage("Kata sandi harus memiliki minimal 6 karakter.");
      } else {
        setErrorMessage("");
      }
    }

    // Memeriksa apakah kata sandi dan konfirmasi kata sandi sama
    if (field === "confirmPassword") {
      if (value !== passwords.newPassword) {
        setErrorMessage("Kata sandi dan konfirmasi kata sandi harus sama.");
      } else {
        setErrorMessage("");
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !passwords.oldPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      showErrorToast("Semua field harus diisi.");
      return;
    }

    const response = await changePassword({
      currentPassword: passwords?.oldPassword,
      newPassword: passwords?.newPassword,
    });
    if (response.success) {
      showSuccessToast("Kata sandi berhasil diubah");
      navigate("/profile/my-profile");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setErrorMessage("");
    } else {
      showErrorToast(response?.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="container my-4">
      {/* STEPPER */}
      <nav className="text-sm text-accent pb-4">
        <Link to="/" className="hover:underline hover:text-[#1D6F64]">
          Beranda
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <Link
          to="/profile/my-profile"
          className="hover:underline hover:text-[#1D6F64]"
        >
          Profil
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">Ubah Kata Sandi</span>
      </nav>
      <div className="flex flex-col md:flex-row justify-start gap-12">
        <SideMenu />
        {/* CHANGE PASSWORD FORM */}
        <div className="flex flex-col gap-3 w-full">
          <h4 className="font-semibold text-2xl">Ubah Kata Sandi</h4>
          <div className="bg-white p-6 rounded-xl shadow-lg overflow-hidden w-full">
            <form
              className="container flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Kata Sandi Lama
                </label>
                <input
                  type={showPassword.old ? "text" : "password"}
                  id="oldPassword"
                  placeholder="Masukkan kata sandi lama Anda"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={(e) =>
                    handlePasswordChange("oldPassword", e.target.value)
                  }
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("old")}
                  className="absolute inset-y-11 right-3 flex items-center text-gray-500 hover:text-[#1D6F64] cursor-pointer"
                >
                  {showPassword.old ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="relative">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Kata Sandi Baru
                </label>
                <input
                  type={showPassword.new ? "text" : "password"}
                  id="newPassword"
                  placeholder="Masukkan kata sandi baru Anda"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={(e) =>
                    handlePasswordChange("newPassword", e.target.value)
                  }
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute inset-y-11 right-3 flex items-center text-gray-500 hover:text-[#1D6F64] cursor-pointer"
                >
                  {showPassword.new ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Konfirmasi Kata Sandi
                </label>
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Masukkan kata sandi Anda"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={(e) =>
                    handlePasswordChange("confirmPassword", e.target.value)
                  }
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

              <p className="text-red-500 text-sm">{errorMessage}</p>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    !passwords.oldPassword ||
                    !passwords.newPassword ||
                    !passwords.confirmPassword ||
                    errorMessage
                  }
                  className="bg-[#1D6F64] hover:bg-[#2a4d48] mt-2 focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer disabled:bg-[#1D6F64]/50"
                >
                  {isLoading ? "Mengubah..." : "Ubah kata sandi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
