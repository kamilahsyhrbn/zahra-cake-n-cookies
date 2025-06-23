import React from "react";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Link } from "react-router-dom";

export const Report = () => {
  return (
    <div>
      <TitleCard title="Laporan Penjualan" />

      <form action="">
        <div className="bg-white p-4 shadow-lg rounded-t-xl w-full flex gap-3 flex-col md:flex-row">
          <div className="w-full">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="startDate"
            >
              Dari Tanggal
            </label>
            <input
              className="shadow appearance-none rounded-md border border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight"
              id="startDate"
              type="date"
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="w-full">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="endDate"
            >
              Sampai Tanggal
            </label>
            <input
              className="shadow appearance-none rounded-md border border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight"
              id="endDate"
              type="date"
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="w-full">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <select
              className="shadow appearance-none rounded-md border border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight"
              id="status"
              type="text"
            >
              <option value="all">Semua</option>
              <option value="in-progress">Diproses</option>
              <option value="delivered">Dikirim</option>
              <option value="completed">Selesai</option>
            </select>
          </div>
        </div>
        <div className="bg-primary shadow-lg rounded-b-xl w-full mb-5">
          <button
            type="submit"
            className="text-white text-center w-full cursor-pointer p-4"
          >
            Lihat
          </button>
        </div>
      </form>

      <section className="flex flex-col md:flex-row gap-3 justify-between md:items-center">
        <h4 className="font-semibold text-lg">
          Laporan penjualan dari tanggal{" "}
          {format(new Date("2023-01-01"), "dd MMMM yyyy", {
            locale: id,
          })}{" "}
          hingga{" "}
          {format(new Date("2023-01-01"), "dd MMMM yyyy", {
            locale: id,
          })}{" "}
          dengan status Selesai
        </h4>

        <Link to="/download">
          <button className="bg-[#1D6F64] py-2 px-4 rounded-lg text-white cursor-pointer">
            Cetak Laporan
          </button>
        </Link>
      </section>

      <section className="relative overflow-x-auto shadow rounded-lg my-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                No.
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Nama Pembeli
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Tanggal Pembelian
              </th>
              <th scope="col" className="px-6 py-4 whitespace-nowrap">
                Status
              </th>
              <th scope="col" className="px-6 py-4 whitespace-nowrap">
                Jumlah
              </th>
              <th scope="col" className="px-6 py-4 whitespace-nowrap">
                Nomor Resi
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr className="bg-white border-b border-gray-200 hover:bg-gray-100 ">
              <td scope="row" className="pl-6 py-4 w-max">
                1
              </td>
              <td className="px-6 py-4 truncate">Jane Smith</td>
              <td className="px-6 py-4">
                {format(new Date("2023-01-01"), "dd MMMM yyyy", {
                  locale: id,
                })}
              </td>
              <td className="px-6 py-4">Diproses</td>
              <td className="px-6 py-4">Rp 100.000</td>
              <td className="px-6 py-4">JP-9487192846</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};
