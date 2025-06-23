import React, { useState } from "react";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { formatCurrency } from "../../../utils/formatNumber";

export const Order = () => {
  const [selectedStatus, setSelectedStatus] = useState("semua");

  return (
    <div>
      <TitleCard title="Daftar Pesanan" />

      <section className="flex flex-col">
        <h4>Jumlah Pesanan</h4>
        <p className="font-medium text-lg">3 Pesanan</p>
      </section>

      {/* TABS */}
      <section className="flex container mt-10 mb-5 overflow-x-auto">
        <div className="border-b border-gray-200 md:w-full">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            <button
              onClick={() => setSelectedStatus("semua")}
              className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-[#1D6F64] hover:text-[#1D6F64] cursor-pointer ${
                selectedStatus === "semua"
                  ? "border-[#1D6F64] text-[#1D6F64]"
                  : "border-transparent text-gray-500"
              }`}
            >
              Semua <span className="text-xs">(1)</span>
            </button>
            <button
              onClick={() => setSelectedStatus("proses")}
              className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-[#1D6F64] hover:text-[#1D6F64] cursor-pointer ${
                selectedStatus === "proses"
                  ? "border-[#1D6F64] text-[#1D6F64]"
                  : "border-transparent text-gray-500"
              }`}
            >
              Diproses <span className="text-xs">(1)</span>
            </button>
            <button
              onClick={() => setSelectedStatus("kirim")}
              className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-[#1D6F64] hover:text-[#1D6F64] cursor-pointer ${
                selectedStatus === "kirim"
                  ? "border-[#1D6F64] text-[#1D6F64]"
                  : "border-transparent text-gray-500"
              }`}
            >
              Dikirim <span className="text-xs">(1)</span>
            </button>
            <button
              onClick={() => setSelectedStatus("selesai")}
              className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-[#1D6F64] hover:text-[#1D6F64] cursor-pointer ${
                selectedStatus === "selesai"
                  ? "border-[#1D6F64] text-[#1D6F64]"
                  : "border-transparent text-gray-500"
              }`}
            >
              Selesai <span className="text-xs">(1)</span>
            </button>
          </nav>
        </div>
      </section>

      <section className="relative overflow-x-auto shadow rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                No. Pesanan
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Nama Pembeli
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Tanggal Pembelian
              </th>
              <th scope="col" className="px-6 py-4 whitespace-nowrap">
                Jumlah Bayar
              </th>
              <th scope="col" className="px-6 py-4 whitespace-nowrap">
                Status
              </th>
              <th scope="col" className="px-6 py-4 whitespace-nowrap">
                Kurir
              </th>
              <th scope="col" className="px-6 py-4 whitespace-nowrap">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr className="bg-white border-b border-gray-200 hover:bg-gray-100 ">
              <td scope="row" className="pl-6 py-4 w-max">
                ZCC-12413
              </td>
              <td className="px-6 py-4 truncate">Jane Smith</td>
              <td className="px-6 py-4">
                {format(new Date("2023-01-01"), "dd MMMM yyyy", {
                  locale: id,
                })}
              </td>
              <td className="px-6 py-4">{formatCurrency(20000)}</td>
              <td className="px-6 py-4">Diproses</td>
              <td className="px-6 py-4">J&T</td>
              <td className="px-6 py-4">
                <Link
                  to="/admin/order-detail/1"
                  className="text-[#1D6F64]  hover:underline font-medium"
                >
                  Detail
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};
