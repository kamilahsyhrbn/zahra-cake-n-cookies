import React from "react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="w-full h-80 lg:h-[25rem] mb-10">
      <div
        style={{
          backgroundImage: "url(/hero2.png)",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
        className="w-full h-full"
      >
        <div className="flex flex-col gap-4 justify-center items-center h-full">
          <div className="text-center flex flex-col">
            <h1 className="text-6xl title2 font-semibold">Zahra</h1>
            <h3 className="text-3xl md:text-2xl text-accent font-medium">
              Cake & Cookies
            </h3>
          </div>

          <p className="max-sm:text-sm text-center mx-4">
            Nikmati berbagai pilihan kue dan cookies yang lembut, renyah, dan
            enak. Temukan rasa manis yang membuat harimu lebih istimewa.
          </p>

          <Link to="/menus" className="w-max">
            <button
              type="button"
              className="bg-[#1D6F64] hover:bg-[#2a4d48] focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl w-max px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer disabled:bg-[#1D6F64]/50"
            >
              Beli Sekarang
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
