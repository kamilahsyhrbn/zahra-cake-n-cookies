import React, { useEffect, useState } from "react";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Link } from "react-router-dom";
import Danger from "../../../components/modals/Danger";
import useUserStore from "../../../store/userStore";
import useAuthStore from "../../../store/authStore";
import { Loader } from "../../../components/common/Loader";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/common/Toast";

export const Admin = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const { admins, getAllAdmins, isLoading, deleteUser } = useUserStore();
  const { currentUser } = useAuthStore();

  useEffect(() => {
    getAllAdmins();
  }, []);

  const handleShowDeleteModal = (id) => {
    setSelectedAdmin(id);
    setShowDeleteModal(true);
  };

  const handleDeleteAdmin = async () => {
    if (selectedAdmin === currentUser?._id) {
      showErrorToast("Tidak dapat menghapus diri sendiri");
      setShowDeleteModal(false);
      return;
    }
    const response = await deleteUser(selectedAdmin);

    if (response?.success) {
      showSuccessToast("Admin berhasil dihapus");
      getAllAdmins();
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
      <TitleCard title="Daftar Admin" />

      <section className="flex flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex flex-col">
          <h4>Jumlah Admin</h4>
          <p className="font-medium text-lg">
            {admins && admins?.length} Admin
          </p>
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

      {admins && admins.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada admin</p>
      ) : (
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
              {admins &&
                admins?.map((admin, i) => (
                  <tr
                    key={admin?._id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td scope="row" className="pl-6 py-4 w-max">
                      {i + 1}
                    </td>
                    <td className="px-6 py-4 truncate">{admin?.name}</td>
                    <td className="px-6 py-4 max-w-48 truncate">
                      {admin?.email}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleShowDeleteModal(admin?._id)}
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
          title="Hapus Admin"
          message="Apakah anda yakin ingin menghapus admin ini?"
          onClose={() => setShowDeleteModal(false)}
          onSubmit={handleDeleteAdmin}
        />
      )}
    </div>
  );
};
