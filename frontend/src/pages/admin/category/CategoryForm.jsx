import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Input } from "../../../components/pages/admin/Input";
import useCategoryStore from "../../../store/categoryStore";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/common/Toast";
import { IoMdClose } from "react-icons/io";

export const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCategory, createCategory, getCategoryById, isLoading } =
    useCategoryStore();
  const [isUpdate, setIsUpdate] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (id) {
      setIsUpdate(true);

      const fetchCategory = async () => {
        try {
          const category = await getCategoryById(id);
          setFormData({
            name: category.data.name,
            description: category.data.description,
            image: category.data.image,
          });
          setPreview(category.data.image);
        } catch (error) {
          console.log("Error in getting category by id", error);
          showErrorToast(error.response.data.message || "Terjadi kesalahan");
        }
      };
      fetchCategory();
    }
  }, [id, getCategoryById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleDeleteImage = () => {
    setFormData({ ...formData, image: "" });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name.toLocaleLowerCase());
      data.append("description", formData.description || "");
      data.append("image", formData.image || "");
      let response;

      if (isUpdate) {
        response = await updateCategory(id, data);
      } else {
        response = await createCategory(data);
      }

      if (response?.success) {
        showSuccessToast(
          isUpdate
            ? "Kategori berhasil diubah"
            : "Kategori berhasil ditambahkan"
        );
        navigate("/admin/categories");

        setFormData({
          name: "",
          description: "",
          image: null,
        });
        setPreview(null);
      }
    } catch (error) {
      showErrorToast(error.response.data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div>
      <TitleCard title={`${isUpdate ? "Ubah" : "Tambah"} Kategori`} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          title={"Nama Kategori"}
          type={"text"}
          name={"name"}
          id={"name"}
          placeholder={"Masukkan nama kategori"}
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          title={"Deskripsi"}
          type={"text"}
          name={"description"}
          id={"description"}
          placeholder={"Masukkan deskripsi kategori"}
          value={formData.description}
          onChange={handleChange}
        />

        <div className="flex items-center gap-6">
          <label
            htmlFor="File"
            className="rounded border border-gray-300 p-4 text-gray-900 shadow-sm cursor-pointer w-48 h-48 flex items-center justify-center text-center"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="font-medium text-sm text-center">
                Upload Gambar
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                />
              </svg>
            </div>
            <input
              type="file"
              id="File"
              className="sr-only"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>

          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-48 object-cover rounded shadow-md"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full cursor-pointer"
              >
                <IoMdClose size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-row justify-end gap-4 items-center">
          <Link to="/admin/categories">
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
            className="bg-[#1D6F64] hover:bg-[#2a4d48] focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer disabled:bg-[#1D6F64]/50 "
          >
            {isLoading
              ? "Memuat..."
              : isUpdate
              ? "Ubah Kategori"
              : "Tambah Kategori"}
          </button>
        </div>
      </form>
    </div>
  );
};
