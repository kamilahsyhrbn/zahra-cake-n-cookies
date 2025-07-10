import React, { useEffect, useState } from "react";
import { TitleLine } from "../../../../components/pages/user/TitleLine";
import { Link, useNavigate, useParams } from "react-router-dom";
import useOrderStore from "../../../../store/orderStore";
import useAuthStore from "../../../../store/authStore";
import { Loader } from "../../../../components/common/Loader";
import { formatCurrency } from "../../../../utils/formatNumber";
import useTransactionStore from "../../../../store/transactionStore";
import Danger from "../../../../components/modals/Danger";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common/Toast";

export const Payment = () => {
  const navigate = useNavigate();
  const orderId = useParams().id;

  const { updateTransactionStatus } = useTransactionStore();
  const { getOrderById, order, isLoading, deleteOrder } = useOrderStore();
  const { currentUser, isLoading: isLoadingUser } = useAuthStore();

  const [subtotal, setSubtotal] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    getOrderById(orderId);
  }, [orderId]);

  useEffect(() => {
    const updateStatusAndCalculateTotal = async () => {
      if (order !== null) {
        if (
          !isLoadingUser &&
          !isLoading &&
          currentUser?._id !== order?.user._id
        ) {
          navigate("/order-history");
        } else {
          await updateTransactionStatus(order?.transaction?.orderId);

          let total = 0;
          order?.items?.forEach((item) => {
            total += parseFloat(item?.price) * item?.quantity;
          });
          setSubtotal(total);
        }
      }
    };

    updateStatusAndCalculateTotal();
  }, [order]);

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteOrder = async () => {
    const response = await deleteOrder(order._id);

    if (response?.success) {
      showSuccessToast("Pesanan berhasil dihapus");
      navigate("/order-history");
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
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
        <Link to="/cart" className="hover:underline hover:text-[#1D6F64]">
          Keranjang
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <span className="cursor-not-allowed hover:text-[#1D6F64]">
          Pemesanan
        </span>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">Pembayaran</span>
      </nav>

      {/* TITLE */}
      <TitleLine title="Pembayaran" />
      <div className="flex flex-col md:flex-row gap-20 mt-10">
        <div className="lg:w-1/2 w-full">
          <iframe
            src={order?.transaction?.paymentUrl}
            title="Midtrans Payment"
            className=""
            style={{
              height: "600px",
              width: "100%",
              maxWidth: "100%",
              minHeight: "300px",
              margin: "0 auto",
            }}
          ></iframe>
        </div>

        <div className="lg:w-5/12 w-full">
          <h3 className="text-xl font-semibold mb-3">Ringkasan Pesanan</h3>
          <div className="bg-[#54B0A2]/30 p-4 flex flex-col gap-3 rounded-lg">
            <div className="flex flex-row justify-between">
              <h4 className="font-semibold text-lg">Menu</h4>
              <h4 className="font-semibold text-lg">Total</h4>
            </div>
            {order &&
              order.items &&
              order.items.map((item) => (
                <div key={item?._id}>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <img
                        src={item?.menu.images[0]}
                        alt={item?.menu.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex flex-col">
                        <p className="font-medium">{item?.menu.name}</p>
                        <p className="text-sm opacity-75">
                          {item?.quantity} x {formatCurrency(item?.price)}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      {formatCurrency(item?.quantity * item?.price)}
                    </p>
                  </div>
                </div>
              ))}

            <hr className="border border-gray-300" />

            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{formatCurrency(subtotal)}</p>
            </div>

            <div className="flex justify-between">
              <p>Ongkos Kirim</p>
              <p>{formatCurrency(order?.shipping?.cost)}</p>
            </div>

            <hr className="border border-gray-300" />

            <div className="flex justify-between">
              <p className="font-semibold">Total</p>
              <p className="font-semibold">
                {formatCurrency(order?.totalPrice)}
              </p>
            </div>
          </div>

          {["expire", "cancel", "deny", "failed"].includes(
            order?.transaction?.transactionStatus
          ) && (
            <div className="my-5 w-full">
              <button
                type="button"
                onClick={handleDeleteModal}
                className="bg-red-600 w-full text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition cursor-pointer"
              >
                Hapus Pesanan
              </button>
            </div>
          )}
        </div>
      </div>

      {isDeleteModalOpen && (
        <Danger
          title="Hapus Pesanan"
          message="Apakah Anda yakin ingin menghapus pesanan ini?"
          onSubmit={handleDeleteOrder}
          onCancel={handleDeleteModal}
        />
      )}
    </div>
  );
};
