import React, { useEffect, useState } from "react";
import { TitleCard } from "../../components/pages/admin/TitleCard";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatNumber";
import { MdOutlineCookie, MdOutlineDeliveryDining } from "react-icons/md";
import { FaMoneyBills } from "react-icons/fa6";
import { SubTitle } from "../../components/pages/admin/SubTitle";
import { MenuCard } from "../../components/pages/admin/MenuCard";
import useMenuStore from "../../store/menuStore";
import useOrderStore from "../../store/orderStore";
import useUserStore from "../../store/userStore";
import { Loader } from "../../components/common/Loader";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const Dashboard = () => {
  const { getAllMenus, menus, bestSelling, getBestSelling, isLoading } =
    useMenuStore();
  const { getOrders, orders } = useOrderStore();
  const { getAllUsers, users } = useUserStore();

  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    getAllMenus({ category: "", sort: "" });
    getOrders();
    getAllUsers();
    getBestSelling();
  }, [getAllMenus, getOrders, getAllUsers, getBestSelling]);

  useEffect(() => {
    let total = 0;
    orders
      .filter((order) => order.status === "completed")
      .forEach((order) => {
        total += order.totalPrice;
      });
    setTotalIncome(total);
  }, [orders]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <TitleCard title="Dashboard" />

      {/* TOTAL CARD */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/admin/menu" className="w-full">
          <div className="bg-white p-4 shadow-md rounded-xl flex flex-col items-center md:items-start lg:flex-row gap-4 justify-between group transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-[#54B0A2] p-4 rounded-full group-hover:bg-[#1D6F64] transition-all duration-300">
              <MdOutlineCookie className="w-10 h-10 group-hover:text-white transition-all duration-300" />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-end">
              <h4 className="font-semibold text-xl text-accent">Total Menu</h4>
              <p className="font-medium text-gray-600">{menus?.length} Menu</p>
            </div>
          </div>
        </Link>
        <Link to="/admin/order" className="w-full">
          <div className="bg-white p-4 shadow-md rounded-xl flex flex-col items-center md:items-start lg:flex-row gap-4 justify-between group transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-[#54B0A2] p-4 rounded-full group-hover:bg-[#1D6F64] transition-all duration-300">
              <MdOutlineDeliveryDining className="w-10 h-10 group-hover:text-white transition-all duration-300" />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-end">
              <h4 className="font-semibold text-xl text-accent">
                Total Pesanan
              </h4>
              <p className="font-medium text-gray-600">
                {orders?.length} Pesanan
              </p>
            </div>
          </div>
        </Link>
        <Link to="/admin/report" className="w-full">
          <div className="bg-white p-4 shadow-md rounded-xl flex flex-col items-center md:items-start lg:flex-row gap-4 justify-between group transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-[#54B0A2] p-4 rounded-full group-hover:bg-[#1D6F64] transition-all duration-300">
              <FaMoneyBills className="w-10 h-10 group-hover:text-white transition-all duration-300" />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-end">
              <h4 className="font-semibold text-xl text-accent">
                Total Pemasukan
              </h4>
              <p className="font-medium text-gray-600">
                {formatCurrency(totalIncome)}
              </p>
            </div>
          </div>
        </Link>
      </section>

      {/* TOP MENU CARD */}
      <section className="my-7">
        <SubTitle title="Menu paling banyak dibeli pelanggan" />

        {bestSelling.length === 0 ? (
          <p className="text-center text-gray-500 mt-4 mb-20">
            Belum ada menu paling banyak dibeli
          </p>
        ) : (
          <div className="flex flex-row flex-nowrap gap-4 items-center overflow-x-scroll py-5 px-2">
            {bestSelling.map((menu) => (
              <MenuCard key={menu._id} menu={menu} />
            ))}
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">
        {/* PESANAN BARU */}
        <div className="flex flex-col gap-3">
          {/* JUDUL */}
          <div className="flex flex-row gap-1">
            <div className="w-1.5 bg-[#1D6F64]"></div>
            <div className="flex justify-between items-center w-full">
              <h1 className="font-semibold text-lg">Pesanan baru</h1>
              <Link to="/admin/orders">
                <button className="text-sm font-medium hover:text-secondary text-gray-400 cursor-pointer">
                  Lihat semua
                </button>
              </Link>
            </div>
          </div>

          {orders?.filter((order) => order.status === "in-progress").length ===
          0 ? (
            <p className="text-sm text-gray-400">Belum ada pesanan baru</p>
          ) : (
            <div className="relative overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-sm text-left   text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 text-center">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No. Pesanan
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama Pembeli
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders
                    ?.filter((order) => order.status === "in-progress")
                    .slice(0, 3)
                    .map((order) => (
                      <tr
                        className="bg-white border-b border-gray-200 hover:bg-gray-100"
                        key={order._id}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {order.transaction.orderId}
                        </th>
                        <td className="px-6 py-4 truncate">
                          {format(new Date(order?.createdAt), "dd MMMM yyyy", {
                            locale: id,
                          })}
                        </td>
                        <td className="px-6 py-4 max-w-48 truncate">
                          {order?.shipping?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatCurrency(order.totalPrice)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* USER BARU */}
        <div className="flex flex-col gap-3">
          {/* JUDUL */}
          <div className="flex flex-row gap-1">
            <div className="w-1.5 bg-[#1D6F64]"></div>
            <div className="flex justify-between items-center w-full">
              <h1 className="font-semibold text-lg">Pelanggan baru</h1>
              <Link to="/admin/users">
                <button className="text-sm font-medium hover:text-secondary text-gray-400 cursor-pointer">
                  Lihat semua
                </button>
              </Link>
            </div>
          </div>

          {users?.length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada pelanggan baru</p>
          ) : (
            <div className="relative overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-sm text-left   text-gray-500">
                <tbody>
                  {users?.slice(0, 4).map((user) => (
                    <tr
                      className="bg-white border-b border-gray-200 hover:bg-gray-100"
                      key={user._id}
                    >
                      <td
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                      >
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={user?.image || "/avatar.png"}
                          alt={user?.name}
                        />
                        <div className="ps-3">
                          <div className="text-base font-semibold">
                            {user?.name}
                          </div>
                          <div className="font-normal text-gray-500 w-36 lg:w-64 truncate">
                            {user?.email}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
