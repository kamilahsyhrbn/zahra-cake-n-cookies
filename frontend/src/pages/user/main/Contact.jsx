import React from "react";
import { TitleDesc } from "../../../components/pages/user/TitleDesc";
import { Link } from "react-router-dom";

export const Contact = () => {
  const address = "Jl. Malik Ibrahim No. 36, Gresik";
  return (
    <div className="container mb-10">
      {/* STEPPER */}
      <nav className="text-sm text-accent pt-4">
        <Link to="/" className="hover:underline hover:text-[#1D6F64]">
          Beranda
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">Kontak Kami</span>
      </nav>

      <TitleDesc
        title="Kontak Kami"
        desc="Hubungi tim kami untuk pertanyaan, bantuan, atau informasi lebih lanjut."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 my-10">
        <div
          className="h-32 rounded bg-[#54B0A2]/25 flex flex-col items-center justify-center gap-3 cursor-pointer"
          onClick={() => window.open("https://wa.me/6287856065038")}
        >
          <h4 className="font-medium text-xl">Nomor Telepon</h4>
          <p className="">+62 87856065038</p>
        </div>

        <div
          className="h-32 rounded bg-[#54B0A2]/25 flex flex-col items-center justify-center gap-3 cursor-pointer"
          onClick={() => window.open("mailto:info.zahracnc@gmail.com")}
        >
          <h4 className="font-medium text-xl">Email</h4>
          <p className="">info.zahracnc@gmail.com</p>
        </div>

        <div
          className="h-32 rounded bg-[#54B0A2]/25 flex flex-col items-center justify-center gap-3 cursor-pointer"
          onClick={() =>
            window.open(
              `https://www.google.com/maps?q=${encodeURIComponent(address)}`
            )
          }
        >
          <h4 className="font-medium text-xl">Alamat</h4>
          <p className=""> Jl. Malik Ibrahim No. 36</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center justify-center">
        <h4 className="font-semibold text-xl">Lokasi</h4>
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            address
          )}&output=embed`}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
