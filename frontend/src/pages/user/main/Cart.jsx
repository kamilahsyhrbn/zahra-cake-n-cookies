import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TitleLine } from "../../../components/pages/user/TitleLine";
import { formatCurrency } from "../../../utils/formatNumber";
import useCartStore from "../../../store/cartStore";
import { Loader } from "../../../components/common/Loader";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/common/Toast";

export const Cart = () => {
  const { getCarts, isLoading, carts, removeFromCart, clearCart } =
    useCartStore();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getCarts();
  }, []);

  const total = () => {
    let total = 0;
    if (carts && carts.menus) {
      carts.menus.forEach((item) => {
        total += item.menu.price * item.quantity;
      });
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    total();
  }, [carts]);

  if (isLoading) {
    return <Loader />;
  }

  const handleDeleteItem = async (id) => {
    const response = await removeFromCart(id);

    if (response.success) {
      showSuccessToast("Menu berhasil dihapus dari keranjang");
      getCarts();
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  const handleClearCart = async () => {
    const response = await clearCart();

    if (response.success) {
      showSuccessToast("Keranjang berhasil dihapus");
      getCarts();
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="container mb-10">
      {/* STEPPER */}
      <nav className="text-sm text-accent pt-4">
        <Link to="/" className="hover:underline hover:text-[#1D6F64]">
          Beranda
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">Keranjang</span>
      </nav>

      {/* TITLE */}
      <TitleLine title="Keranjang Belanja" />

      {/* CART */}
      {carts.length === 0 || carts.menus.length === 0 ? (
        <div className="flex flex-col gap-4 justify-center items-center my-10">
          <img
            src="/empty-cart.svg"
            alt="Keranjang Kosong"
            className="w-4/12"
          />
          <h2 className="text-lg font-medium text-center">
            Keranjang Belanja Kosong
          </h2>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-20 mt-10">
          <div className="lg:w-1/2 w-full">
            <div className="flex flex-col divide-y divide-gray-300">
              {carts.menus.map((item) => (
                <div key={item?._id} className="flex gap-3 py-3 items-center">
                  <img
                    src={item?.menu.images[0]}
                    alt="Produk"
                    className="w-24 h-20 object-cover rounded-md"
                  />
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <h6 className="mb-1 font-medium">{item?.menu.name}</h6>
                      <p className="text-sm opacity-75">
                        {formatCurrency(item?.menu.price)}
                      </p>
                      <p className="text-sm opacity-75">
                        Jumlah : {item?.quantity}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item?.menu._id)}
                      className="text-gray-500 hover:text-red-600 text-2xl cursor-pointer w-max"
                      aria-label="Hapus"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex">
              <button
                type="button"
                onClick={handleClearCart}
                className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition cursor-pointer"
              >
                Kosongkan Keranjang
              </button>
            </div>
          </div>
          <div className="lg:w-5/12 w-full">
            <div className="border-b pb-3">
              <h3 className="text-xl font-semibold mb-3">Total Keranjang</h3>
              <div className="flex flex-col gap-3">
                {carts.menus.map((item) => (
                  <div className="flex justify-between" key={item?._id}>
                    <div className="flex flex-col">
                      <p className="font-medium">{item?.menu.name}</p>
                      <p className="text-sm opacity-75">
                        {item?.quantity} x {formatCurrency(item?.menu.price)}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {formatCurrency(item?.quantity * item?.menu.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex justify-between">
              <p className="font-semibold">TOTAL HARGA</p>
              <p className="font-semibold">{formatCurrency(totalPrice)}</p>
            </div>

            <div className="flex justify-center mt-5">
              <button
                type="button"
                className="bg-[#1D6F64] hover:bg-[#2a4d48] mt-2 focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl w-full px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer disabled:bg-[#1D6F64]/50"
              >
                LANJUTKAN KE PEMBELIAN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
