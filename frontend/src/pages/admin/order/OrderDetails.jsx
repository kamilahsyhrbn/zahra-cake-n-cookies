import React, { useEffect, useState } from "react";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { formatCurrency } from "../../../utils/formatNumber";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Input } from "../../../components/pages/admin/Input";
import useOrderStore from "../../../store/orderStore";
import { Loader } from "../../../components/common/Loader";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/common/Toast";

export const OrderDetails = () => {
  const orderId = useParams().id;
  const navigate = useNavigate();
  const { getOrderById, order, isLoading, updateOrder, isOrderLoading } =
    useOrderStore();
  const [subtotal, setSubtotal] = useState(0);
  const [formData, setFormData] = useState({
    status: "",
    trackingNumber: "",
  });

  useEffect(() => {
    getOrderById(orderId);
  }, [orderId]);

  useEffect(() => {
    let total = 0;
    order?.items?.forEach((item) => {
      total += item?.menu?.price * item?.quantity;
    });
    setSubtotal(total);

    setFormData({
      status: order?.status,
      trackingNumber: order?.shipping?.trackingNumber,
    });
  }, [order]);

  if (isLoading) return <Loader />;

  const handleUpdateOrder = async (e) => {
    e.preventDefault();

    const data = {
      status: formData.status,
      trackingNumber: formData.trackingNumber,
    };

    const response = await updateOrder(orderId, data);

    if (response?.success) {
      showSuccessToast("Pesanan berhasil diperbarui");
      navigate("/admin/orders");
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

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
        {order?.items?.map((item) => (
          <section key={item?._id} className="flex flex-col gap-3 my-5">
            <div className="flex gap-3">
              <img
                src={item?.menu?.images[0]}
                alt={item?.menu?.name}
                className="w-16 h-16 object-cover rounded-md"
              />
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

        <section className="flex gap-1 justify-between">
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

          <form onSubmit={handleUpdateOrder} className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
              <p className="font-medium">Nomor Resi</p>
              <Input
                type="text"
                name="trackingNumber"
                id="trackingNumber"
                placeholder="Masukkan nomor resi"
                className="w-full"
                value={formData.trackingNumber}
                onChange={(e) =>
                  setFormData({ ...formData, trackingNumber: e.target.value })
                }
                disabled={order?.status === "delivered"}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-2 justify-between">
              <p className="font-medium">Status</p>
              <select
                className="border border-gray-300 rounded-md px-2 disabled:cursor-not-allowed"
                name="status"
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                disabled={order?.status === "delivered"}
              >
                <option value="processing" disabled>
                  Diproses
                </option>
                <option value="shipped">Dikirim</option>
                <option value="delivered">Selesai</option>
              </select>
            </div>

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

            {order?.status !== "delivered" && (
              <button
                type="submit"
                disabled={isOrderLoading}
                className="bg-[#1D6F64] py-2 px-4 rounded-lg text-white hover:bg-[#2a4d48] mb-6 transition-all duration-300 cursor-pointer disabled:bg-[#1D6F64]/50 disabled:cursor-not-allowed"
              >
                Simpan Perubahan
              </button>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};
