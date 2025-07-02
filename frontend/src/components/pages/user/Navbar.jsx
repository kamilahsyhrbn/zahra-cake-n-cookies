import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IoMenu,
  IoSearchOutline,
  IoCartOutline,
  IoClose,
  IoLogOutOutline,
} from "react-icons/io5";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import useAuthStore from "../../../store/authStore";
import Danger from "../../modals/Danger";
import { showSuccessToast } from "../../common/Toast";
import { Loader } from "../../common/Loader";
import useCartStore from "../../../store/cartStore";
import { getAccessToken } from "../../../utils/tokenManager";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { currentUser, getCurrentUser, logout, isLoading } = useAuthStore();
  const { carts, getCarts, isLoading: isLoadingCart } = useCartStore();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsDropdownOpen(false);
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }

    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    }

    getCurrentUser();
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    showSuccessToast("Berhasil keluar, sampai jumpa kembali!");
    navigate("/");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");

    if (query) {
      setSearchValue(query);
    } else {
      setSearchValue("");
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();

    if (!query) {
      return;
    }

    navigate(`/search-result?query=${query}`);
  };

  useEffect(() => {
    if (currentUser && getAccessToken()) {
      getCarts();
    }
  }, [currentUser]);

  // if (currentUser && isLoading) {
  //   return <Loader />;
  // }

  return (
    <nav className="sticky -top-1 z-50 bg-white py-4 shadow-md">
      <div className="container flex flex-row items-center justify-between w-full">
        {/* LEFT */}
        <div className="flex flex-row items-center gap-3">
          {/* HAMBURGER MENU */}
          <div className="lg:hidden">
            <button
              onClick={toggleDrawer}
              className="hover:text-[#1D6F64] transition-colors duration-200 cursor-pointer"
            >
              <IoMenu className="text-3xl" />
            </button>
          </div>
          {/* LOGO BRAND */}
          <Link to="/" className={`${showSearch ? "hidden" : "block"}`}>
            <h1 className="title text-3xl">Zahra Cake & Cookies</h1>
          </Link>
        </div>

        {/* MIDDLE */}
        <div className="hidden lg:block">
          <div className="flex flex-row items-center gap-1 lg:gap-3">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className={`transition hover:text-[#1D6F64] cursor-pointer hover:underline hover:underline-offset-4 ${
                      location.pathname === "/"
                        ? "underline underline-offset-4 text-[#1D6F64] font-semibold"
                        : ""
                    }`}
                    to="/"
                  >
                    Beranda
                  </Link>
                </li>

                <li>
                  <Link
                    to="/menus"
                    className={`transition hover:text-[#1D6F64] cursor-pointer hover:underline hover:underline-offset-4 ${
                      location.pathname === "/menus" ||
                      location.pathname.startsWith("/detail-menu")
                        ? "underline underline-offset-4 text-[#1D6F64] font-semibold"
                        : ""
                    }`}
                  >
                    {" "}
                    Menu{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className={`transition hover:text-[#1D6F64] cursor-pointer hover:underline hover:underline-offset-4 ${
                      location.pathname === "/contact"
                        ? "underline underline-offset-4 text-[#1D6F64] font-semibold"
                        : ""
                    }`}
                  >
                    {" "}
                    Kontak{" "}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className={`flex flex-row items-center gap-3 ${
            showSearch ? "w-full" : ""
          }`}
        >
          <form
            className={`relative ${
              showSearch ? "block w-full" : "hidden"
            } lg:block ml-2`}
            onSubmit={handleSearch}
          >
            <IoSearchOutline className="absolute top-1/2 left-3 -translate-y-1/2 opacity-50 text-xl" />

            <input
              type="search"
              name="search"
              id="search"
              autoComplete="off"
              autoCorrect="off"
              placeholder="Cari..."
              className="bg-[#F2F2F2] rounded-xl pl-9 pr-2 w-full py-1.5 focus:outline-[#54B0A2]"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>

          {/* MOBILE SEARCH BUTTON */}
          <button className="lg:hidden" onClick={toggleSearch}>
            <IoSearchOutline className="text-2xl hover:text-[#1D6F64] transition-colors duration-200 cursor-pointer" />
          </button>
          <div className="hidden md:flex items-center gap-3">
            {currentUser && currentUser.role === "user" ? (
              <>
                <Link
                  className={`hover:text-[#1D6F64] transition-colors duration-200 cursor-pointer relative ${
                    location.pathname === "/cart" ? "text-[#1D6F64]" : ""
                  }`}
                  to="/cart"
                >
                  <IoCartOutline className="text-3xl" />
                  <div className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {carts?.menus?.length || 0}
                  </div>
                </Link>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="hover:text-[#1D6F64] transition-colors duration-200 cursor-pointer"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={currentUser?.image || "/avatar.png"}
                      alt={currentUser?.name}
                    />
                  </button>

                  {/* DROPDOWN */}
                  {isDropdownOpen && (
                    <>
                      <div
                        className="fixed top-0 left-0 w-full h-full"
                        onClick={toggleDropdown}
                      ></div>
                      <div className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg">
                        <div className="p-2">
                          <Link
                            to="/profile/my-profile"
                            className={`block rounded-lg px-4 py-2 text-sm ${
                              location.pathname.startsWith("/profile")
                                ? "bg-gray-50 text-[#1D6F64] font-medium"
                                : "text-gray-500 hover:bg-gray-50 "
                            }`}
                          >
                            Profil
                          </Link>

                          <Link
                            to="/purchases"
                            className={`block rounded-lg px-4 py-2 text-sm ${
                              location.pathname === "/purchases"
                                ? "text-[#1D6F64] bg-gray-50 font-medium"
                                : "text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            Riwayat Pembelian
                          </Link>
                        </div>

                        <div className="p-2">
                          <button
                            onClick={toggleModal}
                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50 cursor-pointer"
                          >
                            Keluar
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : currentUser && currentUser.role === "admin" ? (
              <Link to="/admin/dashboard">
                <button className="bg-[#1D6F64] hover:bg-[#2a4d48] text-white px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer flex items-center gap-2">
                  <FaArrowUpRightFromSquare className="text-lg" /> Dashboard
                  Admin
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="bg-[#1D6F64] hover:bg-[#2a4d48] text-white px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {isDrawerOpen && (
        <>
          {/* OVERLAY */}
          <div
            className="fixed top-0 left-0 w-full h-full bg-black/50 z-40"
            onClick={toggleDrawer}
          ></div>

          {/* SIDEBAR */}
          <div className="fixed top-0 left-0 w-8/12 h-full bg-white z-50">
            <div className="px-2 py-6">
              {/* LOGO AND X BUTTON */}
              <div className="flex flex-row items-start justify-between gap-2 px-4 py-2">
                <Link to="/">
                  <h1 className="title text-2xl">Zahra Cake & Cookies</h1>
                </Link>
                <button onClick={toggleDrawer}>
                  <IoClose className="text-3xl hover:text-[#1D6F64] transition-colors duration-200" />
                </button>
              </div>

              {/* MENUS */}
              <ul className="mt-6 space-y-1">
                <li>
                  <Link
                    to="/"
                    className={`block rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100 hover:text-[#1D6F64] transition-colors duration-200 ${
                      location.pathname === "/"
                        ? "bg-gray-100 text-[#1D6F64]"
                        : ""
                    }`}
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/menus"
                    className={`block rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100 hover:text-[#1D6F64] transition-colors duration-200 ${
                      location.pathname === "/menus" ||
                      location.pathname.startsWith("/detail-menu")
                        ? "bg-gray-100 text-[#1D6F64]"
                        : ""
                    }`}
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className={`block rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100 hover:text-[#1D6F64] transition-colors duration-200 ${
                      location.pathname === "/contact"
                        ? "bg-gray-100 text-[#1D6F64]"
                        : ""
                    }`}
                  >
                    Kontak
                  </Link>
                </li>

                {currentUser && currentUser.role === "user" ? (
                  <>
                    <li>
                      <Link
                        to="/cart"
                        className={`block rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100 hover:text-[#1D6F64] transition-colors duration-200 ${
                          location.pathname === "/cart"
                            ? "bg-gray-100 text-[#1D6F64]"
                            : ""
                        }`}
                      >
                        Keranjang
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cart"
                        className={`block rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100 hover:text-[#1D6F64] transition-colors duration-200 ${
                          location.pathname.startsWith("/profile")
                            ? "bg-gray-100 text-[#1D6F64]"
                            : ""
                        }`}
                      >
                        Profil
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cart"
                        className={`block rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100 hover:text-[#1D6F64] transition-colors duration-200 ${
                          location.pathname === "/purchases"
                            ? "bg-gray-100 text-[#1D6F64]"
                            : ""
                        }`}
                      >
                        Riwayat Pembelian
                      </Link>
                    </li>
                  </>
                ) : currentUser && currentUser.role === "admin" ? (
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="block rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100 hover:text-[#1D6F64] transition-colors duration-200"
                    >
                      Dashboard Admin
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className={`block rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100 hover:text-[#1D6F64] transition-colors duration-200 ${
                          location.pathname === "/login"
                            ? "bg-gray-100 text-[#1D6F64]"
                            : ""
                        }`}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className={`block rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100 hover:text-[#1D6F64] transition-colors duration-200 ${
                          location.pathname === "/register"
                            ? "bg-gray-100 text-[#1D6F64]"
                            : ""
                        }`}
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {currentUser && currentUser.role === "user" && (
              <>
                <div className="sticky inset-x-0 top-0 z-50 flex justify-between border-t border-gray-100 bg-white px-4 py-2">
                  <button
                    className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 cursor-pointer w-full"
                    onClick={toggleModal}
                  >
                    <IoLogOutOutline className="text-lg" /> Keluar
                  </button>
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                  <Link
                    to="/profile/my-profile"
                    className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
                  >
                    <img
                      alt={currentUser.name}
                      src={currentUser.image || "/avatar.png"}
                      className="size-10 rounded-full object-cover"
                    />

                    <p className="text-xs">
                      <strong className="block font-medium">
                        {currentUser?.name}
                      </strong>

                      <span className="text-gray-500">
                        {currentUser?.email}
                      </span>
                    </p>
                  </Link>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {isModalOpen && (
        <Danger
          title="Keluar"
          message="Apakah anda yakin ingin keluar?"
          onClose={toggleModal}
          onSubmit={handleLogout}
        />
      )}
    </nav>
  );
};
