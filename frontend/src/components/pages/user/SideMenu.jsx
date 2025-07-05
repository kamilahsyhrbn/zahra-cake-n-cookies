import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { IoPersonOutline, IoPersonRemoveOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import useAuthStore from "../../../store/authStore";
import { DeletAccount } from "../../modals/DeletAccount";
import Danger from "../../modals/Danger";
import { showSuccessToast } from "../../common/Toast";

export const SideMenu = () => {
  const navigate = useNavigate();
  const { currentUser, logout, isLoading } = useAuthStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const location = useLocation();

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleLogoutModalOpen = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    showSuccessToast("Berhasil keluar, sampai jumpa kembali!");
    navigate("/");
  };

  return (
    <div className="md:w-4/12">
      {/* SIDEMENU */}
      <div className="bg-white rounded-t-3xl shadow p-4">
        {isLoading ? (
          <div className="max-w-sm animate-pulse w-full">
            <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
          </div>
        ) : (
          <div className="text-center text-[#1D6F64]">
            <h2 className="font-medium text-2xl">{currentUser?.name}</h2>
          </div>
        )}
      </div>
      <div className=" bg-white shadow my-1.5 whitespace-nowrap">
        <div className="divide-y divide-gray-300">
          <Link to="/profile/my-profile">
            <div
              className={`flex items-center px-4 py-3 
                 ${
                   location.pathname === "/profile/my-profile" ||
                   location.pathname === "/profile/update-profile"
                     ? `bg-[#54B0A2] text-white`
                     : `text-[#1D6F64] hover:bg-[#EEF5FF]`
                 }
              `}
            >
              <IoPersonOutline
                className={`mr-2 text-2xl ${
                  location.pathname === "/profile/my-profile" ||
                  location.pathname === "/profile/update-profile"
                    ? ``
                    : `text-[#1D6F64]`
                } `}
              />
              Akun Saya
            </div>
          </Link>
          <Link to="/profile/change-password">
            <div
              className={`flex items-center px-4 py-3 
                 ${
                   location.pathname === "/profile/change-password"
                     ? `bg-[#54B0A2] text-white`
                     : `text-[#1D6F64] hover:bg-[#EEF5FF]`
                 }
              `}
            >
              <TbEdit
                className={`mr-2 text-2xl ${
                  location.pathname === "/profile/change-password"
                    ? ``
                    : `text-[#1D6F64]`
                } `}
              />{" "}
              Ubah Kata Sandi
            </div>
          </Link>
          <div
            className="flex items-center px-4 py-3 text-[#FF0000] hover:bg-[#EEF5FF] cursor-pointer"
            onClick={handleDeleteModalOpen}
          >
            <IoPersonRemoveOutline className="mr-2 text-2xl text-[#FF0000]" />{" "}
            Hapus Akun
          </div>
        </div>
      </div>
      <div className=" bg-white rounded-b-3xl shadow mb-2">
        <div
          className="flex items-center hover:bg-[#EEF5FF] p-4 w-full rounded-b-3xl text-[#1D6F64] cursor-pointer"
          onClick={handleLogoutModalOpen}
        >
          <FiLogIn className="rotate-180 mr-2 text-2xl" /> Keluar
        </div>
      </div>

      {isDeleteModalOpen && <DeletAccount onClose={handleDeleteModalOpen} />}

      {isLogoutModalOpen && (
        <Danger
          title="Keluar"
          onClose={handleLogoutModalOpen}
          message="Apakah anda yakin ingin keluar?"
          onSubmit={handleLogout}
        />
      )}
    </div>
  );
};
