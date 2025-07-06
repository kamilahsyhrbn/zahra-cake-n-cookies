import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;
import React, { useEffect, useRef, useState } from "react";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import useOrderStore from "../../../store/orderStore";
import { showErrorToast } from "../../../components/common/Toast";
import { formatCurrency } from "../../../utils/formatNumber";

export const Report = () => {
  const { report, reportResult, isLoading } = useOrderStore();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    status: "all",
  });

  const [data, setData] = useState({
    startDate: "",
    endDate: "",
    status: "all",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.startDate) {
      showErrorToast("Masukkan tanggal awal");
      return;
    }
    if (!formData.endDate) {
      showErrorToast("Masukkan tanggal akhir");
      return;
    }

    const response = await report(formData);
    if (response?.success) {
      setData(formData);
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  const handleDownloadPDF = () => {
    const tableBody = [
      [
        { text: "No.", bold: true },
        { text: "Nama Pembeli", bold: true },
        { text: "Tanggal Pembelian", bold: true },
        { text: "Status", bold: true },
        { text: "Jumlah", bold: true },
        { text: "Nomor Resi", bold: true },
      ],
    ];

    reportResult.forEach((report, i) => {
      tableBody.push([
        i + 1,
        report?.shipping?.name || "-",
        new Date(report?.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        report?.status === "all"
          ? "Semua"
          : report?.status === "processing"
          ? "Diproses"
          : report?.status === "shipped"
          ? "Dikirim"
          : "Selesai",
        `Rp ${report?.totalPrice?.toLocaleString("id-ID")}`,
        report?.shipping?.trackingNumber || "-",
      ]);
    });

    const docDefinition = {
      pageSize: "A4",
      pageMargins: [40, 60, 40, 60],
      content: [
        {
          text: "LAPORAN PENJUALAN",
          style: "header",
        },
        {
          text: "Zahra Cake & Cookies",
          style: "subheader",
        },
        {
          text: "No. Telepon: 087856065038 | Email: info.zahracnc@gmail.com | Alamat: Jl. Malik Ibrahim No. 36",
          style: "small",
          margin: [0, 0, 0, 10],
        },
        {
          text: `Periode: ${format(
            new Date(formData.startDate),
            "dd MMMM yyyy",
            { locale: id }
          )} - ${format(new Date(formData.endDate), "dd MMMM yyyy", {
            locale: id,
          })} | Status: ${
            formData.status === "all"
              ? "Semua"
              : formData.status === "processing"
              ? "Diproses"
              : formData.status === "shipped"
              ? "Dikirim"
              : "Selesai"
          }`,
          margin: [0, 0, 0, 10],
          alignment: "center",
        },
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto", "auto", "auto", "auto"],
            body: tableBody,
          },
          layout: "lightHorizontalLines",
        },
        {
          columns: [
            { width: "*", text: "" },
            {
              width: "auto",
              stack: [
                {
                  text: `Gresik, ${format(new Date(), "dd MMMM yyyy", {
                    locale: id,
                  })}`,
                  margin: [0, 30, 0, 80],
                  alignment: "center",
                },
                { text: "(Admin Zahra Cake & Cookies)", alignment: "center" },
              ],
            },
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 5],
        },
        subheader: {
          fontSize: 12,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 5],
        },
        small: {
          fontSize: 9,
          alignment: "center",
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`laporan-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div>
      <TitleCard title="Laporan Penjualan" />

      <form onSubmit={handleSubmit}>
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
              name="startDate"
              max={new Date().toISOString().split("T")[0]}
              onChange={handleFormChange}
              value={formData.startDate}
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
              name="endDate"
              max={new Date().toISOString().split("T")[0]}
              onChange={handleFormChange}
              value={formData.endDate}
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
              name="status"
              onChange={handleFormChange}
              value={formData.status}
            >
              <option value="all">Semua</option>
              <option value="processing">Diproses</option>
              <option value="shipped">Dikirim</option>
              <option value="delivered">Selesai</option>
            </select>
          </div>
        </div>
        <div className="bg-[#1D6F64] shadow-lg rounded-b-xl w-full mb-5 hover:bg-[#2a4d48] transition-all duration-300">
          <button
            type="submit"
            disabled={isLoading}
            className="text-white text-center w-full cursor-pointer p-4 disabled:cursor-not-allowed"
          >
            Lihat
          </button>
        </div>
      </form>

      {data?.startDate && reportResult && (
        <>
          <section className="flex flex-col md:flex-row gap-3 justify-between md:items-center">
            <h4 className="font-semibold text-lg">
              Laporan penjualan dari tanggal{" "}
              {data?.startDate &&
                format(new Date(data?.startDate), "dd MMMM yyyy", {
                  locale: id,
                })}{" "}
              hingga{" "}
              {data?.endDate &&
                format(new Date(data?.endDate), "dd MMMM yyyy", {
                  locale: id,
                })}{" "}
              dengan status{" "}
              {data?.status === "all"
                ? "semua"
                : data?.status === "processing"
                ? "diproses"
                : data?.status === "shipped"
                ? "dikirim"
                : "selesai"}
            </h4>

            {data && reportResult && reportResult.length > 0 && (
              <button
                onClick={handleDownloadPDF}
                className="bg-[#1D6F64] py-2 px-4 rounded-lg text-white cursor-pointer text-nowrap hover:bg-[#2a4d48] transition-all duration-300"
              >
                Cetak Laporan
              </button>
            )}
          </section>

          {data && reportResult && reportResult.length === 0 ? (
            <p className="text-center my-10 text-gray-500">
              Tidak ada data laporan penjualan
            </p>
          ) : (
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
                  {reportResult &&
                    reportResult?.map((order, i) => (
                      <tr
                        key={order._id}
                        className="bg-white border-b border-gray-200 hover:bg-gray-100 "
                      >
                        <td scope="row" className="pl-6 py-4 w-max">
                          {i + 1}
                        </td>
                        <td className="px-6 py-4 truncate">
                          {order.shipping.name}
                        </td>
                        <td className="px-6 py-4">
                          {format(new Date(order.createdAt), "dd MMMM yyyy", {
                            locale: id,
                          })}
                        </td>
                        <td className="px-6 py-4">
                          {order.status === "processing"
                            ? "Diproses"
                            : order.status === "shipped"
                            ? "Dikirim"
                            : "Selesai"}
                        </td>
                        <td className="px-6 py-4">
                          {formatCurrency(order.totalPrice)}
                        </td>
                        <td className="px-6 py-4">
                          {order.shipping.trackingNumber || "-"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </section>
          )}
        </>
      )}
    </div>
  );
};
