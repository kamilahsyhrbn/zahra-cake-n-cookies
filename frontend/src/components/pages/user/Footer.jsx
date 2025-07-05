import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

export const Footer = () => {
  return (
    <div className="bg-accent p-8 text-white">
      <div className="container flex flex-col lg:flex-row justify-between gap-3">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="w-32 cursor-pointer" />
        </Link>

        <div className="flex flex-col md:flex-row gap-3 md:gap-10">
          <div>
            <h4 className="mb-2 cursor-default">Halaman Utama</h4>
            <Link to="/">
              <p className="text-sm hover:underline hover:text-secondary w-max">
                Beranda
              </p>
            </Link>
            <Link to="/menus">
              <p className="text-sm hover:underline hover:text-secondary w-max my-2">
                Menu
              </p>
            </Link>
            <Link to="/contact">
              <p className="text-sm hover:underline hover:text-secondary w-max">
                Tentang Kami
              </p>
            </Link>
          </div>

          <div>
            <h4 className="mb-2 cursor-default">Kontak</h4>
            <p
              className="text-sm hover:underline hover:text-secondary flex items-center gap-1 cursor-pointer w-max mb-2"
              onClick={() => window.open("https://wa.me/6287856065038")}
            >
              <FaWhatsapp className="text-lg" /> +62 87856065038
            </p>
            <p
              className="text-sm hover:underline hover:text-secondary flex items-center gap-1 cursor-pointer w-max"
              onClick={() => window.open("mailto:info.zahracnc@gmail.com")}
            >
              <MdOutlineMailOutline className="text-lg" />{" "}
              info.zahracnc@gmail.com
            </p>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      <p className="flex justify-center">
        <Link to="/" className="text-sm text-center hover:underline">
          &copy; 2025 Zahra Cake & Cookies.
        </Link>
      </p>
    </div>
  );
};
