import React, { useEffect, useState } from "react";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { formatCurrency } from "../../../utils/formatNumber";
import useOrderStore from "../../../store/orderStore";
import { Loader } from "../../../components/common/Loader";

export const Order = () => {
  const [selectedStatus, setSelectedStatus] = useState("semua");
  const [statusLength, setStatusLength] = useState({
    semua: 0,
    diproses: 0,
    dikirim: 0,
    selesai: 0,
  });
  const { orders, getOrders, isLoading } = useOrderStore();

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  useEffect(() => {
    setStatusLength({
      semua: orders?.length,
      diproses: orders?.filter((order) => order.status === "processing").length,
      dikirim: orders?.filter((order) => order.status === "shipped").length,
      selesai: orders?.filter((order) => order.status === "delivered").length,
    });
  }, [orders]);

  const filteredOrders =
    selectedStatus === "semua"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <TitleCard title="Daftar Pesanan" />

      <section className="flex flex-col">
        <h4>Jumlah Pesanan</h4>
        <p className="font-medium text-lg">{orders?.length} Pesanan</p>
      </section>

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
          </nav>
        </div>
      </section>

      {filteredOrders && filteredOrders?.length === 0 ? (
        <p className="text-center text-gray-500">
          Belum ada pesanan dengan status{" "}
          {selectedStatus === "processing"
            ? "diproses"
            : selectedStatus === "shipped"
            ? "dikirim"
            : "selesai"}
        </p>
      ) : (
        <section className="relative overflow-x-auto shadow rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  No. Pesanan
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Nama Pembeli
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Tanggal Pembelian
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Jumlah Bayar
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Kurir
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {filteredOrders &&
                filteredOrders?.map((order) => (
                  <tr
                    key={order?._id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-100 "
                  >
                    <td scope="row" className="pl-6 py-4 w-max">
                      {order?.transaction?.orderId}
                    </td>
                    <td className="px-6 py-4 truncate">
                      {order?.shipping?.name}
                    </td>
                    <td className="px-6 py-4">
                      {format(new Date(order?.createdAt), "dd MMMM yyyy", {
                        locale: id,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {formatCurrency(order?.totalPrice)}
                    </td>
                    <td className="px-6 py-4">
                      {order?.status === "processing"
                        ? "Diproses"
                        : order?.status === "shipped"
                        ? "Dikirim"
                        : "Selesai"}
                    </td>
                    <td className="px-6 py-4 uppercase">
                      {order?.shipping?.courier}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/order-detail/${order?._id}`}
                        className="text-[#1D6F64]  hover:underline font-medium"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};
