import React, { useState } from "react";
import { formatCurrency } from "../../../utils/formatNumber";
import { Link, useNavigate } from "react-router-dom";
import useOrderStore from "../../../store/orderStore";
import { showErrorToast, showSuccessToast } from "../../common/Toast";
import Danger from "../../modals/Danger";
import { Review } from "../../modals/Review";

export const OrderCard = ({ order }) => {
  const { updateOrder, isOrderLoading } = useOrderStore();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleReceived = async () => {
    const response = await updateOrder(order._id, { status: "delivered" });

    if (response?.success) {
      showSuccessToast("Pesanan berhasil diterima");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  const handleCancel = async () => {
    const response = await updateOrder(order._id, { status: "cancelled" });

    if (response?.success) {
      showSuccessToast("Pesanan berhasil dibatalkan");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  const handleCancelModal = () => {
    setIsCancelModalOpen(!isCancelModalOpen);
  };

  const handleReviewModal = () => {
    setIsReviewModalOpen(!isReviewModalOpen);
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow p-4 gap-4 w-full relative">
      <div className="flex flex-col gap-3 my-4">
        {order.items.map((item) => (
          <div key={item._id} className="flex gap-4">
            <div className="relative">
              <img
                src={item?.menu?.images[0]}
                alt={item?.menu?.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              {order.status === "unpaid" && item?.menu?.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 grid place-items-center rounded-xl text-white">
                  Habis
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="font-medium">{item?.menu?.name}</h2>
              <p className="text-gray-500 text-sm">
                {item?.quantity} x {formatCurrency(item?.price)}
              </p>
              <p className="text-sm font-medium mt-2">
                {formatCurrency(item?.quantity * item?.price)}
              </p>
            </div>
          </div>
        ))}
        <div className="absolute top-2 right-3 italic">
          <span>
            {order.status === "unpaid"
              ? "Belum dibayar"
              : order.status === "processing"
              ? "Diproses"
              : order.status === "shipped"
              ? "Dikirim"
              : order.status === "delivered"
              ? "Selesai"
              : "Dibatalkan"}
          </span>
        </div>
      </div>

      <hr className="border border-gray-100" />

      <div className="flex justify-end items-center gap-10">
        <h3 className="font-medium">Total</h3>
        <p className="text-sm font-medium">
          {formatCurrency(order.totalPrice)}
        </p>
      </div>

      <hr className="border border-gray-100" />

      <div className="flex justify-end items-center gap-5">
        <Link to={`/order-history/${order._id}`}>
          <button className="bg-transparent border border-[#54B0A2] hover:bg-[#1D6F64] hover:border-[#1D6F64] hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl cursor-pointer">
            Lihat Detail
          </button>
        </Link>
        {order.status === "unpaid" &&
        (order?.items?.some((item) => item?.menu?.stock === 0) ||
          order.items.some((item) => item.quantity > item?.menu?.stock)) ? (
          <button
            onClick={handleCancelModal}
            className="bg-transparent border border-[#54B0A2] hover:bg-[#1D6F64] hover:border-[#1D6F64] hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl cursor-pointer"
          >
            Batalkan Pesanan
          </button>
        ) : order.status === "unpaid" &&
          (order?.items?.some((item) => item?.menu?.stock !== 0) ||
            order.items.some((item) => item.quantity <= item?.menu?.stock)) ? (
          <Link to={`/payment/${order._id}`}>
            <button className="bg-transparent border border-[#54B0A2] hover:bg-[#1D6F64] hover:border-[#1D6F64] hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl cursor-pointer">
              Bayar Sekarang
            </button>
          </Link>
        ) : order.status === "shipped" ? (
          <button
            onClick={handleReceived}
            className="bg-transparent border border-[#54B0A2] hover:bg-[#1D6F64] hover:border-[#1D6F64] hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl cursor-pointer"
          >
            {isOrderLoading ? "Memproses..." : "Pesanan Diterima"}
          </button>
        ) : order.status === "delivered" &&
          !order.items.every((item) => item.isReviewed) ? (
          <button
            onClick={handleReviewModal}
            className="bg-transparent border border-[#54B0A2] hover:bg-[#1D6F64] hover:border-[#1D6F64] hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl cursor-pointer"
          >
            Berikan Ulasan
          </button>
        ) : (
          ""
        )}
      </div>

      {isCancelModalOpen && (
        <Danger
          title="Hapus Pesanan"
          message="Anda yakin ingin menghapus pesanan ini?"
          onClose={handleCancelModal}
          onSubmit={handleCancel}
        />
      )}

      {isReviewModalOpen && <Review data={order} onClose={handleReviewModal} />}
    </div>
  );
};
