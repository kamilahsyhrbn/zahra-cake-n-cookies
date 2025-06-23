import React from "react";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { formatCurrency } from "../../../utils/formatNumber";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Input } from "../../../components/pages/admin/Input";

export const OrderDetails = () => {
  return (
    <div>
      <TitleCard title="Detail Pesanan Masuk" />

      <div className="bg-white py-4 px-8 shadow-md rounded-xl w-full mb-5">
        <section className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <Link to="/admin/orders">
            <IoIosArrowBack className="w-5 h-5" />
          </Link>
          <h4 className="font-semibold text-xl text-center">Detail Pesanan</h4>
          <div></div>
        </section>

        {/* PESANAN */}
        <section className="flex flex-col gap-3 my-5">
          <div className="flex gap-3">
            <img
              src="https://picsum.photos/200/300"
              alt="Menu"
              className="min-w-16 h-16 object-cover rounded-md"
            />
            <div className="flex flex-col">
              <p className="font-semibold">Lorem, ipsum dolor.</p>
              <p className="text-gray-500 text-xs">
                2 x {formatCurrency(10000)}
              </p>
              <p className="font-semibold text-sm">{formatCurrency(20000)}</p>
            </div>
          </div>
        </section>

        <hr className="my-6 border-gray-300" />

        <section className="flex flex-col gap-1 items-end">
          <p className="font-semibold">Subtotal: {formatCurrency(20000)}</p>
          <p className="font-semibold">Ongkos Kirim: {formatCurrency(10000)}</p>
        </section>

        <hr className="my-6 border-gray-300" />

        <section className="flex flex-col md:flex-row gap-1 justify-between">
          <p className="font-semibold text-lg">Total</p>
          <p className="font-semibold text-lg">{formatCurrency(30000)}</p>
        </section>

        <hr className="my-6 border-gray-300" />

        <section className="flex flex-col gap-2">
          <p className="font-semibold text-lg">Informasi Lainnya</p>
          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <p className="font-medium">No. Pesanan</p>
            <p>ZCNC-Loremipsum.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <p className="font-medium">Waktu Pesanan</p>
            <p>
              {format(new Date("2023-01-01T10:00"), "dd MMMM yyyy, HH:mm", {
                locale: id,
              })}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <p className="font-medium">Kurir</p>
            <p>JNE</p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <p className="font-medium">Estimasi Pengiriman</p>
            <p>3-5 hari</p>
          </div>

          <form action="" className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
              <p className="font-medium">Nomor Resi</p>
              <Input
                type="text"
                name="resi"
                id="resi"
                placeholder="Masukkan nomor resi"
                className="w-full"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-2 justify-between">
              <p className="font-medium">Status</p>
              <select
                className="border border-gray-300 rounded-md px-2"
                name="status"
                id="status"
              >
                <option value="diproses">Diproses</option>
                <option value="dikirim">Dikirim</option>
                <option value="selesai">Selesai</option>
              </select>
            </div>

            <hr className="my-6 border-gray-300" />

            <section className="flex flex-col gap-2">
              <p className="font-semibold text-lg">Alamat Penerima</p>
              <div className="flex flex-col gap-2 bg-[#F2FDFC] border border-gray-100 rounded-lg p-4">
                <p className="font-semibold">John Doe</p>
                <p>08123456789</p>
                <p className="my-6">
                  Jl. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p className="text-sm">
                  Catatan untuk penjual: Lorem, ipsum dolor.
                </p>
              </div>
            </section>

            <button className="bg-[#1D6F64] py-2 px-4 rounded-lg text-white hover:bg-[#2a4d48] transition-all duration-300 my-6 cursor-pointer">
              Simpan Perubahan
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
