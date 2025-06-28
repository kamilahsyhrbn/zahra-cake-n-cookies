import { Link, useNavigate } from "react-router-dom";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Input } from "../../../components/pages/admin/Input";
import useAuthStore from "../../../store/authStore";
import { useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/common/Toast";

export const AdminForm = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.name || !formData.email || !formData.password) {
      showErrorToast("Semua field harus diisi");
      return;
    }

    const response = await register(
      formData.name,
      formData.email,
      formData.phone,
      formData.password,
      formData.role
    );

    console.log("response", response);

    if (response?.success) {
      showSuccessToast("Berhasil menambahkan admin baru");
      navigate("/admin/admins");
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div>
      <TitleCard title="Tambah Admin" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          title={"Nama Admin"}
          type={"text"}
          name={"name"}
          id={"name"}
          placeholder={"Masukkan nama admin"}
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          title={"Email"}
          type={"email"}
          name={"email"}
          id={"email"}
          placeholder={"Masukkan email admin"}
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          title={"Kata Sandi"}
          type={"password"}
          name={"password"}
          id={"password"}
          placeholder={"Masukkan kata sandi admin"}
          value={formData.password}
          onChange={handleChange}
        />

        <div className="flex flex-row justify-end gap-4 items-center">
          <Link to="/admin/admins">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 transition-colors duration-300 font-medium rounded-xl w-auto px-5 py-2.5 text-center cursor-pointer"
            >
              Batal
            </button>
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#1D6F64] hover:bg-[#2a4d48] focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer disabled:bg-[#1D6F64]/50"
          >
            {isLoading ? "Menambahkan..." : "Tambah Admin"}
          </button>
        </div>
      </form>
    </div>
  );
};
