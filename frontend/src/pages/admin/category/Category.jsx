import React, { useEffect, useState } from "react";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Link } from "react-router-dom";
import Danger from "../../../components/modals/Danger";
import useCategoryStore from "../../../store/categoryStore";

import { Loader } from "../../../components/common/Loader";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/common/Toast";

export const Category = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categories, getAllCategories, deleteCategory, isLoading } =
    useCategoryStore();

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleShowDeleteModal = (id) => {
    setSelectedCategory(id);
    setShowDeleteModal(true);
  };

  const handleDeleteCategory = async () => {
    const response = await deleteCategory(selectedCategory);
    if (response?.success) {
      showSuccessToast("Kategori berhasil dihapus");
      getAllCategories();
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
    setShowDeleteModal(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <TitleCard title="Daftar Kategori" />

      <section className="flex flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex flex-col">
          <h4>Jumlah Kategori</h4>
          <p className="font-medium text-lg">
            {categories && categories.length} Kategori
          </p>
        </div>

        <button>
          <Link
            to="/admin/category-form"
            className="mb-5 bg-[#1D6F64] py-2 px-4 rounded-lg text-white hover:bg-[#2a4d48] transition-all duration-300"
          >
            Tambah Kategori
          </Link>
        </button>
      </section>

      {categories && categories?.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada kategori</p>
      ) : (
        <section className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left   text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 w-max">
                  No.
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Nama Kategori
                </th>
                <th scope="col" className="px-6 py-3">
                  Deskripsi
                </th>
                <th scope="col" className="px-6 py-3">
                  Gambar
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category, i) => (
                <tr
                  key={category._id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-100"
                >
                  <td scope="row" className="pl-6 py-4 w-max">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 truncate capitalize">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 max-w-48 truncate">
                    {category.description || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={category.image || "/no-image.png"}
                      alt="Kue"
                      className="min-w-16 md:w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-7 flex gap-3">
                    <Link
                      to={`/admin/category-form/${category._id}`}
                      className="text-[#54B0A2] hover:underline font-medium"
                    >
                      Ubah
                    </Link>
                    <button
                      onClick={() => handleShowDeleteModal(category._id)}
                      className="text-red-500 hover:underline font-medium cursor-pointer"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {showDeleteModal && (
        <Danger
          title="Hapus Kategori"
          message="Apakah anda yakin ingin menghapus kategori ini?"
          onClose={() => setShowDeleteModal(false)}
          onSubmit={handleDeleteCategory}
        />
      )}
    </div>
  );
};
