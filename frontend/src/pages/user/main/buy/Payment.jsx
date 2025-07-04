import React from "react";
import { TitleLine } from "../../../../components/pages/user/TitleLine";
import { Link } from "react-router-dom";

export const Payment = () => {
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
        <span className="hover:underline hover:text-[#1D6F64]">Pemesanan</span>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">Pembayaran</span>
      </nav>

      {/* TITLE */}
      <TitleLine title="Pembayaran" />
    </div>
  );
};
