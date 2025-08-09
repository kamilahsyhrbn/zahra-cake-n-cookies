import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { showSuccessToast } from "../../common/Toast";
import Danger from "../../modals/Danger";
import { AdminProfile } from "../../modals/AdminProfile";

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logout, currentUser } = useAuthStore();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleShowProfileModal = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleShowDeleteModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    logout();
    showSuccessToast("Berhasil keluar, sampai jumpa kembali!");
    navigate("/");
    setIsModalOpen(false);
  };

  return (
    <>
      {/* MOBILE BUTTON */}
      <div className="md:hidden flex items-center gap-2 px-5 py-5 bg-[#fcfcfc] sticky top-0 z-50">
        <button
          className="text-gray-500 hover:text-[#f7c7a3] cursor-pointer"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-7"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <Link to="/admin/dashboard">
          <h1 className="md:hidden text-xl flex items-center gap-2">
            <span className="title2 text-3xl">Zahra</span> Cake & Cookies
          </h1>
        </Link>
      </div>

      {/* SIDEBAR */}
      <div
        className={`border-gray-200 ${
          isOpen ? "flex border-b shadow-md" : "hidden md:flex border-e"
        } fixed md:sticky top-16 md:top-0 md:h-screen flex-col justify-between bg-white w-full md:w-80 z-50 overflow-x-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="px-4 py-6">
          <Link to="/admin/dashboard" className="flex justify-center">
            <img src="/logo.png" alt="brand" className="w-24" />
          </Link>

          <ul className="md:mt-6 space-y-1">
            <li>
              <Link
                to="/admin/dashboard"
                className={`block rounded-lg ${
                  location.pathname === "/admin/dashboard"
                    ? "bg-[#d5eeea]"
                    : "text-gray-500 hover:bg-[#d5eeea] hover:text-gray-700"
                } px-4 py-2 text-sm font-medium`}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/admin/admins"
                className={`block rounded-lg ${
                  location.pathname === "/admin/admins" ||
                  location.pathname.startsWith("/admin/admin-form")
                    ? "bg-[#d5eeea]"
                    : "text-gray-500 hover:bg-[#d5eeea] hover:text-gray-700"
                } px-4 py-2 text-sm font-medium `}
              >
                Data Admin
              </Link>
            </li>

            <li>
              <Link
                to="/admin/menus"
                className={`block rounded-lg ${
                  location.pathname === "/admin/menus" ||
                  location.pathname.startsWith("/admin/menu-form")
                    ? "bg-[#d5eeea]"
                    : "text-gray-500 hover:bg-[#d5eeea] hover:text-gray-700"
                } px-4 py-2 text-sm font-medium `}
              >
                Menu
              </Link>
            </li>

            <li>
              <Link
                to="/admin/categories"
                className={`block rounded-lg ${
                  location.pathname === "/admin/categories" ||
                  location.pathname.startsWith("/admin/category-form")
                    ? "bg-[#d5eeea]"
                    : "text-gray-500 hover:bg-[#d5eeea] hover:text-gray-700"
                } px-4 py-2 text-sm font-medium `}
              >
                Kategori
              </Link>
            </li>

            <li>
              <Link
                to="/admin/orders"
                className={`block rounded-lg ${
                  location.pathname === "/admin/orders" ||
                  location.pathname.startsWith("/admin/order")
                    ? "bg-[#d5eeea]"
                    : "text-gray-500 hover:bg-[#d5eeea] hover:text-gray-700"
                } px-4 py-2 text-sm font-medium `}
              >
                Pesanan
              </Link>
            </li>

            <li>
              <Link
                to="/admin/users"
                className={`block rounded-lg ${
                  location.pathname === "/admin/users"
                    ? "bg-[#d5eeea]"
                    : "text-gray-500 hover:bg-[#d5eeea] hover:text-gray-700"
                } px-4 py-2 text-sm font-medium `}
              >
                Pelanggan
              </Link>
            </li>

            <li>
              <Link
                to="/admin/report"
                className={`block rounded-lg ${
                  location.pathname === "/admin/report"
                    ? "bg-[#d5eeea]"
                    : "text-gray-500 hover:bg-[#d5eeea] hover:text-gray-700"
                } px-4 py-2 text-sm font-medium `}
              >
                Laporan
              </Link>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-200">
          <button
            onClick={handleShowDeleteModal}
            className="border-b border-gray-200 flex items-center w-full p-4 text-sm hover:font-medium cursor-pointer hover:text-red-700"
          >
            Keluar
          </button>
          <div
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50 cursor-pointer"
            onClick={handleShowProfileModal}
          >
            <img
              alt={currentUser?.name}
              src={"/avatar.png"}
              className="size-9 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">
                  {currentUser?.name}
                </strong>

                <span className="truncate">{currentUser?.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Danger
          title="Keluar"
          message="Apakah anda yakin ingin keluar?"
          onClose={handleShowDeleteModal}
          onSubmit={handleLogout}
        />
      )}

      {isProfileOpen && <AdminProfile onClose={handleShowProfileModal} />}
    </>
  );
};
