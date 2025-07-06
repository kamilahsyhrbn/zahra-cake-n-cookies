import React, { useEffect } from "react";
import { SideMenu } from "../../../../components/pages/user/SideMenu";
import useAuthStore from "../../../../store/authStore";
import { Link } from "react-router-dom";
import useUserStore from "../../../../store/userStore";
import { MenuCard } from "../../../../components/pages/user/MenuCard";
import { Loader } from "../../../../components/common/Loader";

export const MyProfile = () => {
  const { currentUser } = useAuthStore();
  const { getLikedMenus, likedMenus, isLikeLoading } = useUserStore();

  useEffect(() => {
    getLikedMenus();
  }, [getLikedMenus]);

  if (isLikeLoading) {
    return <Loader />;
  }

  return (
    <div className="container my-4">
      {/* STEPPER */}
      <nav className="text-sm text-accent pb-4">
        <Link to="/" className="hover:underline hover:text-[#1D6F64]">
          Beranda
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <Link
          to="/profile/my-profile"
          className="hover:underline hover:text-[#1D6F64]"
        >
          Profil
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">Akun Saya</span>
      </nav>

      <div className="flex flex-col md:flex-row justify-start gap-12">
        <SideMenu />

        <div className="flex flex-col gap-8 w-full">
          {/* MY PROFILE */}
          <div className="flex flex-col gap-3 w-full">
            <h4 className="font-semibold text-2xl">Akun Saya</h4>
            <div className="bg-white p-6 rounded-xl shadow-lg overflow-hidden w-full">
              <div className="flex md:flex-row flex-col gap-4 items-center md:items-start">
                <img
                  className="w-24 h-24 object-cover rounded-full border border-gray-200"
                  src={currentUser?.image || "/avatar.png"}
                  alt=""
                />

                <div className="flex flex-col gap-2 w-full">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col lg:flex-row">
                      <span className="font-medium text-[#1D6F64] mr-1 whitespace-nowrap">
                        Nama Lengkap:
                      </span>
                      <span> {currentUser?.name}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row">
                      <span className="font-medium text-[#1D6F64] mr-1 whitespace-nowrap">
                        Nomor Ponsel:
                      </span>
                      <span> {currentUser?.phone}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row">
                      <span className="font-medium text-[#1D6F64] mr-1 whitespace-nowrap">
                        Email:
                      </span>
                      <span> {currentUser?.email}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row">
                      <span className="font-medium text-[#1D6F64] mr-1 whitespace-nowrap">
                        Alamat:
                      </span>
                      <span> {currentUser?.address || "-"}</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3 md:mt-0">
                    <Link to="/profile/update-profile">
                      <button
                        type="button"
                        className="py-2 px-4 rounded-lg bg-[#54B0A2] text-white hover:bg-[#1D6F64] hover:text-white transition duration-300 cursor-pointer"
                      >
                        <div className="flex items-center font-medium">
                          <span className="text-md">Ubah Profil</span>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LIKED MENUS */}
          <div className="flex flex-col gap-3 w-full">
            <h4 className="font-semibold text-2xl">Menu yang Saya Sukai</h4>
            {likedMenus && likedMenus.length === 0 ? (
              <p className="text-sm text-gray-500">
                Belum ada menu yang disukai
              </p>
            ) : (
              <div className="flex flex-row flex-wrap gap-4 justify-center md:justify-start">
                {likedMenus &&
                  likedMenus.map((menu) => (
                    <MenuCard key={menu._id} menu={menu} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
