import React, { useState } from "react";
import { TitleCard } from "../../components/pages/admin/TitleCard";
import Danger from "../../components/modals/Danger";
import { DetailUser } from "../../components/modals/DetailUser";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const Users = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowDetailModal = () => {
    setShowDetailModal(true);
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  return (
    <div>
      <TitleCard title="Daftar Pengguna" />

      <section className="flex flex-col">
        <h4>Jumlah Pelanggan</h4>
        <p className="font-medium text-lg">3 Pelanggan</p>
      </section>

      <section className="relative overflow-x-auto shadow-md rounded-lg mt-5">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 max-sm:text-center">
            <tr>
              <th scope="col" className="px-6 py-3 w-max">
                No.
              </th>
              <th scope="col" className="px-6 py-3 align-middle">
                Nama Pelanggan
              </th>
              <th scope="col" className="px-6 py-3 align-middle">
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center lg:text-start align-middle"
              >
                Tanggal Bergabung
              </th>
              <th scope="col" className="px-6 py-3 text-center align-middle">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b border-gray-200 hover:bg-gray-100">
              <td className="px-6 py-4 align-middle">1</td>
              <td className="px-6 py-4 align-middle">
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={"/avatar.png"}
                    alt={"user"}
                  />
                  <p className="font-medium ps-3">johndoe</p>
                </div>
              </td>
              <td className="px-6 py-4 align-middle text-gray-500">
                johndoe@gmail.com
              </td>
              <td className="px-6 py-4 align-middle text-gray-500 text-nowrap">
                {format(new Date("2023-01-01"), "dd MMMM yyyy", {
                  locale: id,
                })}
              </td>
              <td className="px-6 py-7 align-middle text-center flex justify-center gap-3">
                <button
                  // onClick={() => handleDetailModal(user)}
                  onClick={handleShowDetailModal}
                  className="font-medium text-[#54B0A2] hover:underline cursor-pointer"
                >
                  Lihat
                </button>

                <button
                  onClick={() => handleShowDeleteModal()}
                  className="font-medium text-red-600 hover:underline cursor-pointer"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {showDetailModal && (
        <DetailUser onClose={() => setShowDetailModal(false)} />
      )}

      {showDeleteModal && (
        <Danger
          title="Hapus Pelanggan"
          message="Apakah anda yakin ingin menghapus pelanggan ini?"
          onClose={() => setShowDeleteModal(false)}
          onSubmit={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};
