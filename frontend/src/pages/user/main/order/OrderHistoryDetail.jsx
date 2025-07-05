import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useOrderStore from "../../../../store/orderStore";
import { IoIosArrowBack } from "react-icons/io";
import useAuthStore from "../../../../store/authStore";
import { formatCurrency } from "../../../../utils/formatNumber";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Loader } from "../../../../components/common/Loader";
import Danger from "../../../../components/modals/Danger";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common/Toast";

export const OrderHistoryDetail = () => {
  const navigate = useNavigate();
  const orderId = useParams().id;

  const { getOrderById, order, isLoading, updateOrder, isOrderLoading } =
    useOrderStore();
  const { currentUser, isLoading: isLoadingUser } = useAuthStore();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    getOrderById(orderId);
  }, [orderId]);

  useEffect(() => {
    if (order) {
      if (
        !isLoadingUser &&
        !isLoading &&
        currentUser?._id !== order?.user._id
      ) {
        navigate("/order-history");
      }
    }
    let total = 0;
    order?.items?.forEach((item) => {
      total += parseFloat(item?.price) * item?.quantity;
    });
    setSubtotal(total);
  }, [order]);

  const handleReceived = async () => {
    const response = await updateOrder(order._id, { status: "delivered" });

    if (response?.success) {
      showSuccessToast("Pesanan berhasil diterima");
      navigate("/order-history");
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  const handleCancel = async () => {
    const response = await updateOrder(order._id, { status: "cancelled" });

    if (response?.success) {
      showSuccessToast("Pesanan berhasil dibatalkan");
      navigate("/order-history");
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  const handleCancelModal = () => {
    setIsCancelModalOpen(!isCancelModalOpen);
  };

  const handlePrintNota = () => {
    const docDefinition = {
      content: [
        { text: "Nota Pembelian", style: "header", alignment: "center" },
        { text: "\n" },
        {
          table: {
            widths: ["*", "*"],
            body: [
              ["No. Pesanan", order?.transaction?.orderId],
              [
                "Waktu Pesanan",
                format(new Date(order?.createdAt), "dd MMMM yyyy, HH:mm", {
                  locale: id,
                }),
              ],
              [
                "Status",
                order?.status === "unpaid"
                  ? "Belum Dibayar"
                  : order?.status === "processing"
                  ? "Diproses"
                  : order?.status === "shipped"
                  ? "Dikirim"
                  : order?.status === "delivered"
                  ? "Selesai"
                  : "Dibatalkan",
              ],
              [
                "Kurir",
                `${order?.shipping?.courier.toUpperCase()}, ${
                  order?.shipping?.service
                }`,
              ],
              ["Estimasi Pengiriman", `${order?.shipping?.estimation} hari`],
              [
                "Nomor Resi",
                order?.shipping?.trackingNumber ||
                  "Penjual belum memasukkan nomor resi",
              ],
            ],
          },
          margin: [0, 0, 0, 10],
        },
        {
          text: "Detail Menu",
          style: "subheader",
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: [
              ["Nama Menu", "Jumlah x Harga", "Total"],
              ...order?.items?.map((item) => [
                item?.menu?.name,
                `${item?.quantity} x ${formatCurrency(item?.price)}`,
                formatCurrency(item?.quantity * item?.price),
              ]),
            ],
          },
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            widths: ["*", "auto"],
            body: [
              ["Subtotal", formatCurrency(subtotal)],
              ["Ongkos Kirim", formatCurrency(order?.shipping?.cost)],
              [
                { text: "Total", bold: true },
                { text: formatCurrency(order?.totalPrice), bold: true },
              ],
            ],
          },
          margin: [0, 0, 0, 10],
        },
        {
          text: "Alamat Penerima",
          style: "subheader",
        },
        {
          text: `${order?.shipping?.name}\n${order?.shipping?.phone}\n${
            order?.shipping?.address
          }, ${order?.shipping?.city}, ${
            order?.shipping?.province
          }\nCatatan untuk penjual: ${order?.shipping?.note || "-"}`,
          margin: [0, 0, 0, 10],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download(
      `Nota-${format(new Date(order?.createdAt), "dd MMMM yyyy, HH:mm", {
        locale: id,
      })}.pdf`
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mb-10">
      {/* STEPPER */}
      <nav className="text-sm text-accent pt-4">
        <Link to="/" className="hover:underline hover:text-[#1D6F64]">
          Beranda
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <Link
          to="/order-history"
          className="hover:underline hover:text-[#1D6F64]"
        >
          Riwayat Pesanan
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">
          Detail Riwayat Pesanan
        </span>
      </nav>

      <div className="bg-white py-4 px-8 shadow-md rounded-xl w-full my-5">
        <section className="flex flex-row flex-wrap justify-between items-center gap-4">
          <Link to="/order-history">
            <IoIosArrowBack className="w-5 h-5" />
          </Link>
          <h4 className="font-semibold text-xl text-center flex-1 whitespace-nowrap">
            Detail Pesanan
          </h4>
          <p className="italic">
            {order?.status === "unpaid"
              ? "Belum Dibayar"
              : order?.status === "processing"
              ? "Diproses"
              : order?.status === "shipped"
              ? "Dikirim"
              : order?.status === "delivered"
              ? "Selesai"
              : "Dibatalkan"}
          </p>
        </section>

        {order?.items?.map((item) => (
          <section key={item?._id} className="flex flex-col gap-3 my-5">
            <div className="flex gap-3">
              <div className="relative">
                <img
                  src={item?.menu?.images[0]}
                  alt={item?.menu?.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                {order.status === "unpaid" && item?.menu?.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 grid place-items-center rounded-xl text-white">
                    Habis
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">{item?.menu?.name}</p>
                <p className="text-gray-500 text-xs">
                  {item?.quantity} x {formatCurrency(item?.price)}
                </p>
                <p className="font-semibold text-sm">
                  {formatCurrency(item?.quantity * item?.price)}
                </p>
              </div>
            </div>
          </section>
        ))}

        <hr className="my-6 border-gray-300" />

        <section className="flex flex-col gap-1 items-end">
          <p className="font-semibold">Subtotal: {formatCurrency(subtotal)}</p>
          <p className="font-semibold">
            Ongkos Kirim: {formatCurrency(order?.shipping?.cost)}
          </p>
        </section>

        <hr className="my-6 border-gray-300" />

        <section className="flex flex-row gap-1 justify-between">
          <p className="font-semibold text-lg">Total</p>
          <p className="font-semibold text-lg">
            {formatCurrency(order?.totalPrice)}
          </p>
        </section>

        <hr className="my-6 border-gray-300" />

        <section className="flex flex-col gap-2">
          <p className="font-semibold text-lg">Informasi Lainnya</p>
          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <p className="font-medium">No. Pesanan</p>
            <p>{order?.transaction?.orderId}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <p className="font-medium">Waktu Pesanan</p>
            <p>
              {order?.createdAt &&
                format(new Date(order?.createdAt), "dd MMMM yyyy, HH:mm", {
                  locale: id,
                })}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <p className="font-medium">Kurir</p>
            <p>
              <span className="uppercase">{order?.shipping?.courier}, </span>
              {order?.shipping?.service}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <p className="font-medium">Estimasi Pengiriman</p>
            <p>{order?.shipping?.estimation} hari</p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <p className="font-medium">Nomor Resi</p>
            <p>
              {order?.shipping?.trackingNumber ||
                "Penjual belum memasukkan nomor resi"}
            </p>
          </div>
        </section>
        <hr className="my-6 border-gray-300" />

        <section className="flex flex-col gap-2 mb-6">
          <p className="font-semibold text-lg">Alamat Penerima</p>
          <div className="flex flex-col gap-2 bg-[#F2FDFC] border border-gray-100 rounded-lg p-4">
            <p className="font-semibold">{order?.shipping?.name}</p>
            <p>{order?.shipping?.phone}</p>
            <p className="my-6">{order?.shipping?.address}</p>
            <p className="text-sm">
              Catatan untuk penjual: {order?.shipping?.note || "-"}
            </p>
          </div>
        </section>

        <section className="flex flex-wrap justify-center gap-10 items-center">
          {order?.status !== "unpaid" && order?.status !== "cancelled" && (
            <button
              onClick={handlePrintNota}
              className="bg-transparent border border-[#54B0A2] hover:bg-[#1D6F64] hover:border-[#1D6F64] hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl cursor-pointer"
            >
              Cetak Nota
            </button>
          )}

          {order?.status === "unpaid" &&
          (order?.items?.some((item) => item?.menu?.stock === 0) ||
            order.items.some((item) => item.quantity > item?.menu?.stock)) ? (
            <button
              onClick={handleCancelModal}
              className="bg-transparent border border-[#54B0A2] hover:bg-[#1D6F64] hover:border-[#1D6F64] hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl cursor-pointer"
            >
              Batalkan Pesanan
            </button>
          ) : order?.status === "unpaid" &&
            (order?.items?.some((item) => item?.menu?.stock !== 0) ||
              order.items.some(
                (item) => item.quantity <= item?.menu?.stock
              )) ? (
            <div className="flex gap-10 items-center">
              <Link to={`/payment/${order?._id}`}>
                <button className="bg-transparent border border-[#54B0A2] hover:bg-[#1D6F64] hover:border-[#1D6F64] hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl cursor-pointer">
                  Bayar Sekarang
                </button>
              </Link>

              <button
                onClick={handleCancelModal}
                className="bg-transparent border border-[#54B0A2] hover:bg-[#1D6F64] hover:border-[#1D6F64] hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl cursor-pointer"
              >
                Batalkan Pesanan
              </button>
            </div>
          ) : order?.status === "shipped" ? (
            <button
              onClick={handleReceived}
              className="bg-transparent border border-[#54B0A2] hover:bg-[#1D6F64] hover:border-[#1D6F64] hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl cursor-pointer"
            >
              {isOrderLoading ? "Memproses..." : "Pesan Diterima"}
            </button>
          ) : order?.status === "delivered" &&
            !order.items.every((menu) => menu.isReviewed) ? (
            <button className="bg-transparent border border-[#54B0A2] hover:bg-[#1D6F64] hover:border-[#1D6F64] hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl cursor-pointer">
              Berikan Ulasan
            </button>
          ) : (
            ""
          )}
        </section>
      </div>

      {isCancelModalOpen && (
        <Danger
          title="Hapus Pesanan"
          message="Anda yakin ingin menghapus pesanan ini?"
          onClose={handleCancelModal}
          onSubmit={handleCancel}
        />
      )}
    </div>
  );
};
