import React, { useEffect, useState } from "react";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Link } from "react-router-dom";
import Danger from "../../../components/modals/Danger";
import useMenuStore from "../../../store/menuStore";
import { Loader } from "../../../components/common/Loader";
import { formatCurrency } from "../../../utils/formatNumber";
import { showSuccessToast } from "../../../components/common/Toast";

export const Menu = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const { menus, getAllMenus, isLoading, deleteMenu } = useMenuStore();

  const handleShowDeleteModal = (menuId) => {
    setSelectedMenu(menuId);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    getAllMenus({ category: "", sort: "newest" });
  }, []);

  const handleDeleteMenu = async () => {
    const response = await deleteMenu(selectedMenu);
    if (response?.success) {
      showSuccessToast("Menu berhasil dihapus");
      getAllMenus();
    }
    setShowDeleteModal(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <TitleCard title="Daftar Menu" />

      <section className="flex flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex flex-col">
          <h4>Jumlah Menu</h4>
          <p className="font-medium text-lg">{menus?.length} Menu</p>
        </div>

        <button>
          <Link
            to="/admin/menu-form"
            className="mb-5 bg-[#1D6F64] py-2 px-4 rounded-lg text-white hover:bg-[#2a4d48] transition-all duration-300"
          >
            Tambah Menu
          </Link>
        </button>
      </section>

      {menus?.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada menu</p>
      ) : (
        <section className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left   text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 w-max">
                  No.
                </th>
                <th scope="col" className="px-6 py-3 truncate">
                  Nama Menu
                </th>
                <th scope="col" className="px-6 py-3 truncate">
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3">
                  Harga
                </th>
                <th scope="col" className="px-6 py-3">
                  Stok
                </th>
                <th scope="col" className="px-6 py-3">
                  Deskripsi
                </th>
                <th scope="col" className="px-6 py-3">
                  Foto Menu
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {menus?.map((menu, i) => (
                <tr
                  key={menu?._id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-100"
                >
                  <td scope="row" className="pl-6 py-4 w-max">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 max-w-50 truncate">{menu?.name}</td>
                  <td className="px-6 py-4 max-w-50 truncate capitalize">
                    {menu?.category ? menu?.category?.name : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatCurrency(menu?.price)}
                  </td>
                  <td className="px-6 py-4">{menu?.stock}</td>
                  <td className="px-6 py-4 max-w-48 truncate">
                    {menu?.description ? menu?.description : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={menu?.images[0]}
                      alt={menu?.name}
                      className="min-w-20 md:w-20 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-10 flex gap-3">
                    <Link
                      to={`/admin/menu-form/${menu?._id}`}
                      className="text-[#54B0A2] hover:underline font-medium"
                    >
                      Ubah
                    </Link>
                    <button
                      onClick={() => handleShowDeleteModal(menu?._id)}
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
          title="Hapus Menu"
          message="Apakah anda yakin ingin menghapus menu ini?"
          onClose={() => setShowDeleteModal(false)}
          onSubmit={handleDeleteMenu}
        />
      )}
    </div>
  );
};
