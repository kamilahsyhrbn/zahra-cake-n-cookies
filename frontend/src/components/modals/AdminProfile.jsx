import React, { useEffect, useState } from "react";
import { Input } from "../pages/admin/Input";
import useAuthStore from "../../store/authStore";
import useUserStore from "../../store/userStore";
import { showErrorToast, showSuccessToast } from "../common/Toast";

export const AdminProfile = ({ onClose }) => {
  const [show, setShow] = useState(false);
  const { currentUser, changePassword, getCurrentUser } = useAuthStore();
  const { updateUser, isLoading } = useUserStore();
  const [formData, setFormData] = useState({
    name: currentUser?.name,
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    setShow(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser?.name,
      });
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateUserPromise =
      formData.name !== currentUser.name
        ? updateUser(currentUser._id, { name: formData.name })
        : Promise.resolve({ success: true });

    const changePasswordPromise =
      formData.currentPassword && formData.newPassword
        ? changePassword({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          })
        : Promise.resolve({ success: true });

    try {
      const [updateUserResponse, changePasswordResponse] = await Promise.all([
        updateUserPromise,
        changePasswordPromise,
      ]);

      if (updateUserResponse.success && changePasswordResponse.success) {
        showSuccessToast("Berhasil memperbarui profil");
        onClose();
        getCurrentUser();
      } else {
        if (!updateUserResponse.success) {
          showErrorToast(
            updateUserResponse.response.data.message || "Terjadi kesalahan"
          );
        }
        if (!changePasswordResponse.success) {
          showErrorToast(
            changePasswordResponse.response.data.message || "Terjadi kesalahan"
          );
        }
      }
    } catch (error) {
      showErrorToast(
        "Terjadi kesalahan saat mencoba memperbarui profil atau kata sandi"
      );
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex md:items-center justify-center z-50 overflow-y-auto">
      <div
        className={`bg-white p-8 w-full h-max md:max-w-xl rounded-lg transform transition-all duration-300 m-5 ${
          show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-center font-semibold text-xl mb-5">Profil Admin</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            title="Nama Admin"
            name="name"
            type="text"
            value={formData.name || ""}
            onChange={handleChange}
          />
          <Input
            title="Email"
            name="email"
            type="email"
            disabled
            value={currentUser?.email}
          />

          <Input
            title="Kata Sandi Lama"
            name="currentPassword"
            type="password"
            value={formData.currentPassword || ""}
            onChange={handleChange}
          />

          <Input
            title="Kata Sandi Baru"
            name="newPassword"
            type="password"
            value={formData.newPassword || ""}
            onChange={handleChange}
          />

          <p className="text-sm text-red-500">
            *Biarkan kosong jika tidak ingin mengubah kata sandi
          </p>

          <div className="flex gap-3 justify-end mt-5">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg ml-2 transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
            >
              Tutup
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#1D6F64] py-2 px-4 rounded-lg text-white hover:bg-[#2a4d48] transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-[#1D6F64]/50"
            >
              {isLoading ? "Memuat..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
