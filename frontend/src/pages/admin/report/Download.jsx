import { format } from "date-fns";
import { id } from "date-fns/locale";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Download = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false);

  // useEffect(() => {
  //   if (!hasRun.current) {
  //     hasRun.current = true;

  //     window.print();
  //     setTimeout(() => {
  //       navigate("/admin/report");
  //     }, 300);
  //   }
  // }, []);
  return (
    <div className="p-8">
      <div className="min-h-screen flex flex-col">
        <section className="text-center">
          <h1 className="font-bold text-2xl text-center">Laporan Penjualan</h1>
          <h2 className="font-semibold text-lg text-center">
            Zahra Cake & Cookies
          </h2>
          <p className="text-sm text-center text-gray-500 mt-3">
            No. Telepon: 08123456789 || Email: johndoe@example.com || Alamat:
            Jl. Contoh, Contoh, Contoh
          </p>
        </section>

        <hr className="my-6 border-gray-200" />

        <h2 className="font-semibold text-lg text-center mb-3">
          Laporan penjualan dari tanggal 01 Januari 2023 hingga 01 Januari 2023
          dengan status Semua
        </h2>
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

      <section className="flex justify-end items-end">
        <div className="flex flex-col justify-between gap-24">
          <div>
            <h4 className="text-center font-semibold">
              Gresik,{" "}
              {format(new Date("2025-01-01"), "dd MMMM yyyy", {
                locale: id,
              })}
            </h4>
          </div>
          <div>
            <h4 className="text-center font-medium">
              (Admin Zahra Cake & Cookies)
            </h4>
          </div>
        </div>
      </section>
    </div>
  );
};
