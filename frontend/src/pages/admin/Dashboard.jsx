import React from "react";
import { TitleCard } from "../../components/pages/admin/TitleCard";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatNumber";
import { MdOutlineCookie, MdOutlineDeliveryDining } from "react-icons/md";
import { FaMoneyBills } from "react-icons/fa6";
import { SubTitle } from "../../components/pages/admin/SubTitle";
import { MenuCard } from "../../components/pages/admin/MenuCard";

export const Dashboard = () => {
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
              <p className="font-medium text-gray-600">3 Menu</p>
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
              <p className="font-medium text-gray-600">3 Pesanan</p>
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
                {formatCurrency(1000000)}
              </p>
            </div>
          </div>
        </Link>
      </section>

      {/* TOP MENU CARD */}
      <section className="my-7">
        <SubTitle title="Menu paling banyak dibeli pelanggan" />

        <div className="flex flex-row flex-nowrap gap-4 items-center overflow-x-scroll py-5 px-2">
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">
        {/* PESANAN BARU */}
        <div className="flex flex-col gap-3">
          {/* JUDUL */}
          <div className="flex flex-row gap-1">
            <div className="w-1.5 bg-[#1D6F64]"></div>
            <div className="flex justify-between items-center w-full">
              <h1 className="font-semibold text-lg">Pesanan baru</h1>
              <Link to="/admin/order">
                <button className="text-sm font-medium hover:text-secondary text-gray-400 cursor-pointer">
                  Lihat semua
                </button>
              </Link>
            </div>
          </div>

          {/* {transactions?.length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada transaksi</p>
          ) : ( */}
          <div className="relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left   text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID Pesanan
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
                {/* {transactions?.slice(0, 6).map((transaction) => ( */}
                <tr
                  className="bg-white border-b border-gray-200 hover:bg-gray-100"
                  // key={transaction._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    12345567
                  </th>
                  <td className="px-6 py-4 truncate">21 April 2025</td>
                  <td className="px-6 py-4 max-w-48 truncate">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatCurrency(10000)}
                  </td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
          {/* )} */}
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

          {/* {users?.filter(
            (user) => user.role === "user" && user.isActive === false
          ).length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada pengguna</p>
          ) : ( */}
          <div className="relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left   text-gray-500">
              <tbody>
                {/* {users
                    ?.filter(
                      (user) => user.role === "user" && user.isActive === false
                    )
                    .slice(0, 4)
                    .map((user) => ( */}
                <tr
                  className="bg-white border-b border-gray-200 hover:bg-gray-100"
                  // key={user._id}
                >
                  <td
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={"/avatar.png"}
                      alt="avatar"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">John Doe</div>
                      <div className="font-normal text-gray-500 w-36 lg:w-64 truncate">
                        johndoe@gmail.com
                      </div>
                    </div>
                  </td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
