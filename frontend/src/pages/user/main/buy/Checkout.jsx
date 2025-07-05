import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TitleLine } from "../../../../components/pages/user/TitleLine";
import { Input } from "../../../../components/pages/admin/Input";
import useCartStore from "../../../../store/cartStore";
import { Loader } from "../../../../components/common/Loader";
import { formatCurrency } from "../../../../utils/formatNumber";
import useRajaOngkirStore from "../../../../store/rajaOngkirStore";
import useAuthStore from "../../../../store/authStore";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common/Toast";
import useOrderStore from "../../../../store/orderStore";

export const Checkout = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { getCarts, isLoading, carts } = useCartStore();
  const { provincies, getProvinces, cities, getCities, shipping, getCosts } =
    useRajaOngkirStore();
  const { createOrder, isLoading: isOrderLoading } = useOrderStore();
  const [cost, setCost] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedServiceOption, setSelectedServiceOption] = useState("");
  const [address, setAddress] = useState({
    province: "",
    city: "",
  });

  const [formData, setFormData] = useState({
    items: [],
    name: "",
    phone: "",
    address: "",
    province: "",
    city: "",
    courier: "",
    service: "",
    cost: 0,
    estimation: "",
    notes: "",
  });
  const formRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser?.name,
        phone: currentUser?.phone,
        address: currentUser?.address,
      });
    }
  }, [currentUser]);

  useEffect(() => {
    getCarts();
    getProvinces();
  }, []);

  useEffect(() => {
    if (formData.province) {
      getCities(formData.province);
    }
  }, [formData.province]);

  const subTotalMenu = () => {
    let total = 0;
    if (carts && carts.menus) {
      carts.menus.forEach((item) => {
        total += item.menu.price * item.quantity;
      });
    }
    setSubTotal(total);
  };

  useEffect(() => {
    if (carts && carts.menus) {
      let totalWeight = 0;
      carts.menus.forEach((item) => {
        totalWeight += item.menu.weight * item.quantity;
      });
      setTotalWeight(totalWeight);

      setFormData({
        ...formData,
        items: carts.menus,
      });
    }

    subTotalMenu();
  }, [carts]);

  useEffect(() => {
    if (formData.province && formData.city && formData.courier) {
      getCosts({
        destination: formData.city,
        weight: totalWeight,
      });
    }
  }, [formData.province, formData.city, formData.courier]);

  useEffect(() => {
    if (formData.cost) {
      setCost(formData.cost);
    }
  }, [formData.cost]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    let filteredValue = value;

    if (name === "name") {
      filteredValue = value.replace(/[^A-Za-z\s]/g, "").slice(0, 50);
    }

    if (name === "phone") {
      filteredValue = value.replace(/\D/g, "").slice(0, 16);
    }

    if (name === "province") {
      const selectedProvince = provincies.find((p) => p.province_id === value);

      // Simpan id ke formData
      setFormData((prev) => ({
        ...prev,
        province: value,
      }));

      // Update address dengan province name
      setAddress((prev) => ({
        ...prev,
        province: selectedProvince?.province || "",
      }));
      return; // berhenti di sini agar else tidak overwrite
    }

    if (name === "city") {
      const selectedCity = cities.find((c) => c.city_id === value);

      // Simpan id ke formData
      setFormData((prev) => ({
        ...prev,
        city: value,
      }));

      // Update address dengan city name
      setAddress((prev) => ({
        ...prev,
        city: selectedCity?.city_name || "",
      }));
      return; // berhenti di sini agar else tidak overwrite
    }

    if (name === "service") {
      const parsed = JSON.parse(value);

      setFormData((prev) => ({
        ...prev,
        service: parsed.service,
        cost: parsed.cost,
        estimation: parsed.estimation,
      }));

      setSelectedServiceOption(value);
      setCost(parsed.cost);
      return;
    }

    // default update
    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));
  };

  useEffect(() => {
    setTotalPrice(subTotal + cost);
  }, [subTotal, cost]);

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      return showErrorToast("Nama harus diisi");
    } else if (!formData.phone) {
      return showErrorToast("Nomor telepon harus diisi");
    } else if (!formData.address) {
      return showErrorToast("Alamat harus diisi");
    } else if (!formData.province) {
      return showErrorToast("Provinsi harus diisi");
    } else if (!formData.city) {
      return showErrorToast("Kota harus diisi");
    } else if (!formData.courier) {
      return showErrorToast("Kurir harus diisi");
    } else if (!formData.service) {
      return showErrorToast("Layanan harus diisi");
    }
    const fullAddress = `${formData.address}, Kota ${address.city}, Provinsi ${address.province}`;

    const data = {
      ...formData,
      address: fullAddress,
    };

    const response = await createOrder(data);
    console.log("response", response);
    if (response?.success) {
      showSuccessToast("Pesanan Berhasil Dibuat");
      navigate(`/payment/${response.data._id}`);
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  console.log("formData", formData);

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
        <span className="text-gray-800 font-semibold">Pemesanan</span>
      </nav>

      {/* TITLE */}
      <TitleLine title="Pemesanan" />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mt-10">
        <div className="lg:w-1/2 w-full">
          <h3 className="text-xl font-semibold mb-3">Alamat</h3>

          <form ref={formRef} onSubmit={handleCheckout}>
            <div className="flex flex-col gap-3">
              <Input
                title="Nama Penerima"
                type="text"
                name="name"
                placeholder="Masukkan Nama Penerima"
                value={formData?.name}
                onChange={handleFormChange}
              />

              <Input
                title="Nomor Telepon"
                type="text"
                name="phone"
                placeholder="Masukkan Nomor Telepon"
                value={formData?.phone}
                onChange={handleFormChange}
              />

              <div className="flex flex-col gap-1">
                <label htmlFor="address" className="text-sm font-medium">
                  Alamat
                </label>
                <textarea
                  name="address"
                  id="address"
                  value={formData?.address}
                  onChange={handleFormChange}
                  placeholder="Masukkan alamat Anda"
                  rows="4"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex flex-col gap-1 w-full">
                  <h3 className="text-sm font-medium">Provinsi</h3>
                  <select
                    name="province"
                    id="province"
                    value={formData?.province}
                    onChange={handleFormChange}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5"
                  >
                    <option value="" disabled selected>
                      Pilih Provinsi
                    </option>
                    {provincies &&
                      provincies.map((province) => (
                        <option
                          key={province?.province_id}
                          value={province?.province_id}
                        >
                          {province?.province}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <h3 className="text-sm font-medium">Kota/Kabupaten</h3>
                  <select
                    name="city"
                    id="city"
                    value={formData?.city}
                    onChange={handleFormChange}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5"
                  >
                    <option value="" disabled selected>
                      {formData?.province
                        ? "Pilih Kota/Kabupaten"
                        : "Silakan Pilih Provinsi Terlebih Dahulu"}
                    </option>
                    {cities &&
                      cities.map((city) => (
                        <option key={city?.city_id} value={city?.city_id}>
                          {city?.type} {city?.city_name}, {city?.postal_code}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex flex-col gap-1 w-full">
                  <h3 className="text-sm font-medium">Ekpedisi</h3>
                  <select
                    name="courier"
                    id="courier"
                    value={formData?.courier}
                    onChange={handleFormChange}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5"
                  >
                    <option value="" disabled selected>
                      Pilih Layanan
                    </option>
                    <option value="jne">JNE</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <h3 className="text-sm font-medium">Layanan</h3>
                  <select
                    name="service"
                    id="service"
                    value={selectedServiceOption}
                    onChange={handleFormChange}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5"
                  >
                    <option value="" disabled selected>
                      {!formData?.province
                        ? "Silakan Pilih Provinsi Terlebih Dahulu"
                        : !formData?.city
                        ? "Silakan Pilih Kota/Kabupaten Terlebih Dahulu"
                        : !formData?.courier
                        ? "Silakan Pilih Ekpedisi Terlebih Dahulu"
                        : "Pilih Layanan"}
                    </option>
                    {shipping &&
                      shipping[0] &&
                      shipping[0].costs &&
                      shipping[0].costs.map((cost, i) => (
                        <option
                          value={JSON.stringify({
                            service: `${cost?.description} (${cost?.service})`,
                            cost: cost?.cost[0]?.value,
                            estimation: cost?.cost[0]?.etd,
                          })}
                          key={i}
                        >
                          {cost?.description} ({cost?.service}) -{" "}
                          {cost?.cost && formatCurrency(cost?.cost[0]?.value)},{" "}
                          {cost?.cost && cost?.cost[0]?.etd} hari
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="notes" className="text-sm font-medium">
                  Catatan Untuk Penjual
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  value={formData?.notes}
                  onChange={handleFormChange}
                  placeholder="Masukkan catatan untuk penjual (opsional)"
                  rows="4"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="lg:w-5/12 w-full">
          <h3 className="text-xl font-semibold mb-3">Ringkasan Pesanan</h3>
          <div className="bg-[#54B0A2]/30 p-4 flex flex-col gap-3 rounded-lg">
            <div className="flex flex-row justify-between">
              <h4 className="font-semibold text-lg">Menu</h4>
              <h4 className="font-semibold text-lg">Total</h4>
            </div>
            {carts &&
              carts.menus &&
              carts.menus.map((item) => (
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
                          {item?.quantity} x {formatCurrency(item?.menu.price)}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      {formatCurrency(item?.quantity * item?.menu.price)}
                    </p>
                  </div>
                </div>
              ))}

            <hr className="border border-gray-300" />

            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{formatCurrency(subTotal)}</p>
            </div>

            <div className="flex justify-between">
              <p>Ongkos Kirim</p>
              <p>{formatCurrency(cost)}</p>
            </div>

            <hr className="border border-gray-300" />

            <div className="flex justify-between">
              <p className="font-semibold">Total</p>
              <p className="font-semibold">{formatCurrency(totalPrice)}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => formRef.current.requestSubmit()}
        className="bg-[#1D6F64] hover:bg-[#2a4d48] w-full mt-7 focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer disabled:bg-[#1D6F64]/50"
      >
        {isOrderLoading ? "Membuat Pesanan..." : "Buat Pesanan"}
      </button>
    </div>
  );
};
