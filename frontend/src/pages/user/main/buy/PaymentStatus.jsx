import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTransactionStore from "../../../../store/transactionStore";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common/Toast";

import { Loader } from "../../../../components/common/Loader";

export const PaymentStatus = () => {
  const navigate = useNavigate();
  const { webHookMidtrans, isLoading } = useTransactionStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const order_id = new URLSearchParams(window.location.search).get("order_id");
  const transaction_status = new URLSearchParams(window.location.search).get(
    "transaction_status"
  );

  useEffect(() => {
    const fetchTransactionStatus = async () => {
      const response = await webHookMidtrans({
        order_id,
        transaction_status,
      });
      console.log("response", response);

      if (response?.success) {
        setIsSuccess(true);
        showSuccessToast("Pembayaran berhasil");
      } else {
        showErrorToast(response?.response?.data?.message || "Pembayaran gagal");
      }
    };

    fetchTransactionStatus();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-200 min-h-svh flex justify-center items-center">
      <div className="mx-5 bg-white p-10 rounded-2xl flex flex-col justify-center items-center gap-3 max-w-3xl">
        <img
          src={isSuccess ? "/success.svg" : "/fail.svg"}
          alt="Order Confirmed"
          className="md:w-1/2"
        />
        <h2 className="text-xl md:text-2xl font-semibold text-center my-5">
          {isSuccess ? "Pembayaran Berhasil 🎉" : "Pembayaran Gagal"}
        </h2>
        {isSuccess ? (
          <p className="text-center">
            Terima kasih! Pembayaran Anda telah berhasil diterima. <br />
            Pesanan Anda kini sudah masuk dan akan segera diproses.
          </p>
        ) : (
          <p className="text-center">
            {transaction_status === "expire"
              ? "Maaf, pembayaran Anda telah kadaluarsa. Silakan lakukan pesanan ulang atau hubungi admin."
              : " Mohon maaf, pembayaran Anda gagal. Silakan coba lagi atau hubungi admin."}
          </p>
        )}

        <Link to="/order-history">
          <button className="bg-[#1D6F64] hover:bg-[#2a4d48] text-white cursor-pointer w-full mt-2 focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl px-5 py-2.5 text-center">
            Lihat pesanan saya
          </button>
        </Link>
      </div>
    </div>
  );
};
