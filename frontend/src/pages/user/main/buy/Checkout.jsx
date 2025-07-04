import React from "react";
import { Link } from "react-router-dom";
import { TitleLine } from "../../../../components/pages/user/TitleLine";

export const Checkout = () => {
  return (
    <div className="container mb-10">
      {/* STEPPER */}
      <nav className="text-sm text-accent pt-4">
        <Link to="/" className="hover:underline hover:text-[#1D6F64]">
          Beranda
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <Link to="/carts" className="hover:underline hover:text-[#1D6F64]">
          Keranjang
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">Pemesanan</span>
      </nav>

      {/* TITLE */}
      <TitleLine title="Keranjang Belanja" />
    </div>
  );
};
