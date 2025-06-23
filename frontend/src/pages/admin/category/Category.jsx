import React, { useState } from "react";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Link } from "react-router-dom";
import Danger from "../../../components/modals/Danger";

export const Category = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  return (
    <div>
      <TitleCard title="Daftar Kategori" />

      <section className="flex flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex flex-col">
          <h4>Jumlah Kategori</h4>
          <p className="font-medium text-lg">3 Kategori</p>
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
            <tr className="bg-white border-b border-gray-200 hover:bg-gray-100">
              <td scope="row" className="pl-6 py-4 w-max">
                1
              </td>
              <td className="px-6 py-4 truncate">Kue</td>
              <td className="px-6 py-4 max-w-48 truncate">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officiis ducimus qui laboriosam commodi ut, provident itaque
                ipsa. Ullam accusamus deleniti explicabo suscipit officiis.
              </td>
              <td className="px-6 py-4">
                <img
                  src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Kue"
                  className="min-w-16 h-16 object-cover rounded-md"
                />
              </td>
              <td className="px-6 py-7 flex gap-3">
                <Link
                  to="/admin/category-form/1"
                  className="text-[#54B0A2] hover:underline font-medium"
                >
                  Ubah
                </Link>
                <button
                  onClick={handleShowDeleteModal}
                  className="text-red-500 hover:underline font-medium cursor-pointer"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {showDeleteModal && (
        <Danger
          title="Hapus Kategori"
          message="Apakah anda yakin ingin menghapus kategori ini?"
          onClose={() => setShowDeleteModal(false)}
          onSubmit={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};
