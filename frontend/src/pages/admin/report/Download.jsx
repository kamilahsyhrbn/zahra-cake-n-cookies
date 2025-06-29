import { format } from "date-fns";
import { id } from "date-fns/locale";
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useOrderStore from "../../../store/orderStore";
import { formatCurrency } from "../../../utils/formatNumber";

export const Download = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false);

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const startDate = query.get("startDate") || "";
  const endDate = query.get("endDate") || "";
  const status = query.get("status") || "";

  const { reportResult } = useOrderStore();

  useEffect(() => {
    if (reportResult.length === 0) {
      navigate("/admin/report");
    }
  }, [reportResult]);

  useEffect(() => {
    if (!hasRun.current && reportResult.length !== 0) {
      hasRun.current = true;

      window.print();
      setTimeout(() => {
        navigate("/admin/report");
      }, 300);
    }
  }, []);

  return (
    <div className="p-8 flex flex-col justify-between min-h-svh">
      <div className="flex flex-col">
        <section className="text-center">
          <h1 className="font-bold text-2xl text-center">Laporan Penjualan</h1>
          <h2 className="font-semibold text-lg text-center">
            Zahra Cake & Cookies
          </h2>
          <p className="text-sm text-center text-gray-500 mt-3">
            No. Telepon: 087856065038 || Email: zahracakencookies@gmail.com ||
            Alamat: Jl. Malik Ibrahim No. 36
          </p>
        </section>

        <hr className="my-6 border-gray-200" />

        <h2 className="font-semibold text-lg text-center mb-3">
          Laporan penjualan dari tanggal{" "}
          {startDate &&
            format(new Date(startDate), "dd MMMM yyyy", {
              locale: id,
            })}{" "}
          hingga{" "}
          {endDate && format(new Date(endDate), "dd MMMM yyyy", { locale: id })}{" "}
          dengan status{" "}
          {status === "all"
            ? "semua"
            : status === "in-progress"
            ? "diproses"
            : status === "delivered"
            ? "dikirim"
            : "selesai"}
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
              {reportResult.map((report, i) => (
                <tr
                  key={report?._id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-100 "
                >
                  <td scope="row" className="pl-6 py-4 w-max">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 truncate">
                    {report?.shipping?.name}
                  </td>
                  <td className="px-6 py-4">
                    {report?.createdAt &&
                      format(new Date(report?.createdAt), "dd MMMM yyyy", {
                        locale: id,
                      })}
                  </td>
                  <td className="px-6 py-4">
                    {report?.status === "all"
                      ? "Semua"
                      : report?.status === "in-progress"
                      ? "Diproses"
                      : report?.status === "delivered"
                      ? "Dikirim"
                      : "Selesai"}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(report?.totalPrice)}
                  </td>
                  <td className="px-6 py-4">
                    {report?.shipping?.trackingNumber || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <section className="flex justify-end items-end">
        <div className="flex flex-col justify-between gap-24">
          <div>
            <h4 className="text-center font-semibold">
              Gresik,{" "}
              {format(new Date(), "dd MMMM yyyy", {
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
