import React, { useEffect, useState } from "react";
import { TitleCard } from "../../components/pages/admin/TitleCard";
import Danger from "../../components/modals/Danger";
import { DetailUser } from "../../components/modals/DetailUser";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import useUserStore from "../../store/userStore";
import { Loader } from "../../components/common/Loader";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/common/Toast";

export const Users = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { users, getAllUsers, isLoading, deleteUser } = useUserStore();

  useEffect(() => {
    getAllUsers();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const handleShowDetailModal = (userId) => {
    setSelectedUser(userId);
    setShowDetailModal(true);
  };

  const handleShowDeleteModal = (userId) => {
    setSelectedUser(userId);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    const response = await deleteUser(selectedUser);
    if (response?.success) {
      showSuccessToast("Pelanggan berhasil dihapus");
      getAllUsers();
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
    setShowDeleteModal(false);
  };

  return (
    <div>
      <TitleCard title="Daftar Pengguna" />

      <section className="flex flex-col">
        <h4>Jumlah Pelanggan</h4>
        <p className="font-medium text-lg">
          {users && users?.length} Pelanggan
        </p>
      </section>

      {users && users.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada pelanggan</p>
      ) : (
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
              {users?.map((user, i) => (
                <tr
                  key={user?._id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 align-middle">{i + 1}</td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user?.image || "/avatar.png"}
                        alt={user?.name}
                      />
                      <p className="font-medium ps-3">{user?.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle text-gray-500">
                    {user?.email}
                  </td>
                  <td className="px-6 py-4 align-middle text-gray-500 text-nowrap">
                    {format(new Date(user?.createdAt), "dd MMMM yyyy", {
                      locale: id,
                    })}
                  </td>
                  <td className="px-6 py-7 align-middle text-center flex justify-center gap-3">
                    <button
                      onClick={() => handleShowDetailModal(user)}
                      className="font-medium text-[#54B0A2] hover:underline cursor-pointer"
                    >
                      Lihat
                    </button>

                    <button
                      onClick={() => handleShowDeleteModal(user?._id)}
                      className="font-medium text-red-600 hover:underline cursor-pointer"
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

      {showDetailModal && (
        <DetailUser
          onClose={() => setShowDetailModal(false)}
          data={selectedUser}
        />
      )}

      {showDeleteModal && (
        <Danger
          title="Hapus Pelanggan"
          message="Apakah anda yakin ingin menghapus pelanggan ini?"
          onClose={() => setShowDeleteModal(false)}
          onSubmit={handleDeleteUser}
        />
      )}
    </div>
  );
};
