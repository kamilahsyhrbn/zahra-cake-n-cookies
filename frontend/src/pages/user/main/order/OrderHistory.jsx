import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TitleLine } from "../../../../components/pages/user/TitleLine";
import useOrderStore from "../../../../store/orderStore";
import { Loader } from "../../../../components/common/Loader";
import { OrderCard } from "../../../../components/pages/user/OrderCard";

export const OrderHistory = () => {
  const { getUserOrder, isLoading, orders } = useOrderStore();
  const [selectedStatus, setSelectedStatus] = useState("semua");
  const [statusLength, setStatusLength] = useState({
    semua: 0,
    unpaid: 0,
    diproses: 0,
    dikirim: 0,
    selesai: 0,
    dibatalkan: 0,
  });

  useEffect(() => {
    getUserOrder();
  }, []);

  useEffect(() => {
    setStatusLength({
      semua: orders?.length,
      unpaid: orders?.filter(
        (order) =>
          order.status === "unpaid" &&
          order.items.every((item) => item.menu !== null)
      ).length,
      diproses: orders?.filter(
        (order) =>
          order.status === "processing" &&
          order.items.every((item) => item.menu !== null)
      ).length,
      dikirim: orders?.filter(
        (order) =>
          order.status === "shipped" &&
          order.items.every((item) => item.menu !== null)
      ).length,
      selesai: orders?.filter(
        (order) =>
          order.status === "delivered" &&
          order.items.every((item) => item.menu !== null)
      ).length,
      dibatalkan: orders?.filter(
        (order) =>
          order.status === "cancelled" &&
          order.items.every((item) => item.menu !== null)
      ).length,
    });
  }, [orders]);

  const filteredOrders =
    selectedStatus === "semua"
      ? orders.filter((order) =>
          order.items.every((item) => item.menu !== null)
        )
      : orders.filter(
          (order) =>
            order.status === selectedStatus &&
            order.items.every((item) => item.menu !== null)
        );
  console.log("order", orders);

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
        <span className="text-gray-800 font-semibold">Riwayat Pesanan</span>
      </nav>

      {/* TITLE */}
      <TitleLine title="Pesanan Saya" />

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
              Semua <span className="text-xs">({statusLength?.semua})</span>
            </button>
            <button
              onClick={() => setSelectedStatus("unpaid")}
              className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-[#1D6F64] hover:text-[#1D6F64] cursor-pointer ${
                selectedStatus === "unpaid"
                  ? "border-[#1D6F64] text-[#1D6F64]"
                  : "border-transparent text-gray-500"
              }`}
            >
              Belum Bayar{" "}
              <span className="text-xs">({statusLength?.unpaid})</span>
            </button>
            <button
              onClick={() => setSelectedStatus("processing")}
              className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-[#1D6F64] hover:text-[#1D6F64] cursor-pointer ${
                selectedStatus === "processing"
                  ? "border-[#1D6F64] text-[#1D6F64]"
                  : "border-transparent text-gray-500"
              }`}
            >
              Diproses{" "}
              <span className="text-xs">({statusLength?.diproses})</span>
            </button>
            <button
              onClick={() => setSelectedStatus("shipped")}
              className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-[#1D6F64] hover:text-[#1D6F64] cursor-pointer ${
                selectedStatus === "shipped"
                  ? "border-[#1D6F64] text-[#1D6F64]"
                  : "border-transparent text-gray-500"
              }`}
            >
              Dikirim <span className="text-xs">({statusLength?.dikirim})</span>
            </button>
            <button
              onClick={() => setSelectedStatus("delivered")}
              className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-[#1D6F64] hover:text-[#1D6F64] cursor-pointer ${
                selectedStatus === "delivered"
                  ? "border-[#1D6F64] text-[#1D6F64]"
                  : "border-transparent text-gray-500"
              }`}
            >
              Selesai <span className="text-xs">({statusLength?.selesai})</span>
            </button>
            <button
              onClick={() => setSelectedStatus("cancelled")}
              className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium hover:border-[#1D6F64] hover:text-[#1D6F64] cursor-pointer ${
                selectedStatus === "cancelled"
                  ? "border-[#1D6F64] text-[#1D6F64]"
                  : "border-transparent text-gray-500"
              }`}
            >
              Dibatalkan{" "}
              <span className="text-xs">({statusLength?.dibatalkan})</span>
            </button>
          </nav>
        </div>
      </section>

      {filteredOrders && filteredOrders?.length === 0 ? (
        <p className="text-center text-gray-500">
          Belum ada pesanan{" "}
          {selectedStatus !== "semua" &&
            (selectedStatus === "unpaid"
              ? "dengan status belum bayar"
              : selectedStatus === "processing"
              ? "dengan status diproses"
              : selectedStatus === "shipped"
              ? "dengan status dikirim"
              : selectedStatus === "delivered"
              ? "dengan status selesai"
              : "dengan status dibatalkan")}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders &&
            filteredOrders.map((order) => (
              <OrderCard order={order} key={order._id} />
            ))}
        </div>
      )}
    </div>
  );
};
