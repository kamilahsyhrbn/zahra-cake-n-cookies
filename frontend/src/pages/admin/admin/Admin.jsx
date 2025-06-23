import React, { useState } from "react";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Link } from "react-router-dom";
import Danger from "../../../components/modals/Danger";

export const Admin = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  return (
    <div>
      <TitleCard title="Daftar Admin" />

      <section className="flex flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex flex-col">
          <h4>Jumlah Admin</h4>
          <p className="font-medium text-lg">3 Admin</p>
        </div>

        <button>
          <Link
            to="/admin/admin-form"
            className="mb-5 bg-[#1D6F64] py-2 px-4 rounded-lg text-white hover:bg-[#2a4d48] transition-all duration-300"
          >
            Tambah Admin
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
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Nama Admin
              </th>
              <th scope="col" className="px-6 py-3">
                Email
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
              <td className="px-6 py-4 truncate">John Doe</td>
              <td className="px-6 py-4 max-w-48 truncate">
                johndoe@example.com
              </td>
              <td className="px-6 py-4">
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
          title="Hapus Admin"
          message="Apakah anda yakin ingin menghapus admin ini?"
          onClose={() => setShowDeleteModal(false)}
          onSubmit={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};
