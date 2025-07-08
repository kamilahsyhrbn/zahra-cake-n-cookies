import React, { useEffect, useRef, useState } from "react";
import { SideMenu } from "../../../../components/pages/user/SideMenu";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../../store/authStore";
import useUserStore from "../../../../store/userStore";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common/Toast";
import { Input } from "../../../../components/pages/admin/Input";

export const UpdateProfile = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { updateUser, isLoading } = useUserStore();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser?.name,
        bio: currentUser?.bio,
        phone: currentUser?.phone,
        address: currentUser?.address,
        image: currentUser?.image,
      });
    }
  }, [currentUser]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setFormData({ ...formData, image: file });
  };

  const handleDeleteImage = () => {
    setFormData({ ...formData, image: "" });
    setImagePreview(null);
  };

  const handleFormChange = (e) => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.length < 3 || formData?.name.trim() === "") {
      showErrorToast("Nama harus memiliki minimal 3 karakter.");
      return;
    }
    if (formData.phone.length < 10 || formData?.phone.trim() === "") {
      showErrorToast("Nomor telepon harus memiliki minimal 10 digit.");
      return;
    }

    if (formData.image && formData.image.size > 5 * 1024 * 1024) {
      showErrorToast("Ukuran gambar maksimal 5MB.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("image", formData.image || "");

    const response = await updateUser(currentUser?._id, data);
    if (response.success) {
      showSuccessToast("Profil berhasil diperbarui.");
      navigate("/profile/my-profile");
    } else {
      showErrorToast(response.message || "Terjadi kesalahan.");
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
        <Link
          to="/profile/my-profile"
          className="hover:underline hover:text-[#1D6F64]"
        >
          Akun Saya
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">Ubah Profil</span>
      </nav>

      <div className="flex flex-col md:flex-row justify-start gap-12">
        <SideMenu />

        {/* UPDATE PROFILE */}
        <div className="flex flex-col gap-3 w-full">
          <h4 className="font-semibold text-2xl">Ubah Profil</h4>
          <div className="bg-white p-6 rounded-xl shadow-lg overflow-hidden w-full">
            <form
              className="container flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : formData?.image
                      ? `${formData?.image}`
                      : "/avatar.png"
                  }
                  alt="Profile Picture"
                  className="w-36 h-36 rounded-full object-cover"
                />

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleButtonClick}
                      type="button"
                      className="bg-accent hover:bg-accentHover text-white transition-colors duration-300 px-5 py-2.5 rounded-xl cursor-pointer"
                    >
                      {currentUser?.image ? "Ubah foto" : "Tambah foto"}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      name="image"
                      id="image"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                  <button
                    onClick={handleDeleteImage}
                    className="bg-transparent border border-accent hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors duration-300 px-5 py-2 rounded-xl cursor-pointer"
                    type="button"
                  >
                    Hapus foto
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Input
                  title="Nama"
                  name="name"
                  type="text"
                  value={formData?.name}
                  onChange={handleFormChange}
                />

                <Input
                  title="Nomor Telepon"
                  name="phone"
                  type="text"
                  value={formData?.phone}
                  onChange={handleFormChange}
                />

                <div className="flex flex-col gap-1">
                  <label htmlFor="address" className="text-sm font-medium">
                    Alamat
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    value={formData?.address}
                    onChange={handleFormChange}
                    placeholder="Masukkan alamat Anda"
                    rows="4"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                  />
                </div>

                <div className="flex items-center justify-end mt-6 gap-3">
                  <Link to="/profile/my-profile">
                    <button
                      type="button"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer disabled:bg-gray-200"
                    >
                      Batal
                    </button>
                  </Link>
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      formData?.name?.trim() === "" ||
                      formData?.phone?.trim() === ""
                    }
                    className="bg-[#1D6F64] hover:bg-[#2a4d48] focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer disabled:bg-[#1D6F64]/50"
                  >
                    {isLoading ? "Memperbarui..." : "Perbarui Profil"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
