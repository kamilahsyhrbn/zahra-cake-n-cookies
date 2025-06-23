import React, { useEffect, useState } from "react";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Link, useLocation } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { Input } from "../../../components/pages/admin/Input";
import { IoMdClose } from "react-icons/io";

export const MenuForm = () => {
  const location = useLocation();
  const [isUpdate, setIsUpdate] = useState(true);
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    if (location.pathname === "/admin/form-menu") {
      setIsUpdate(false);
    }
  }, [location]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 10));
  };

  const removeImage = (indexToRemove, imageId) => {
    setDeletedImages((prevDeletedImages) => [...prevDeletedImages, imageId]);
    const filteredImages = images.filter((_, index) => index !== indexToRemove);
    setImages(filteredImages);
  };

  useEffect(() => {
    if (location.pathname === "/admin/menu-form") {
      setIsUpdate(false);
    }
  }, [location]);

  return (
    <div>
      <TitleCard title={`${isUpdate ? "Ubah" : "Tambah"} Menu`} />

      <form action="" className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Foto Menu</h3>
          <div className="flex flex-wrap gap-4">
            {/* Input file */}
            <label htmlFor="upload" className="block w-max">
              <div className="w-36 h-36 border border-gray-300 rounded-xl flex flex-col justify-center items-center bg-gray-100 shadow cursor-pointer">
                <FaCamera />
                <p className="text-sm text-gray-500 mt-2">Tambah foto</p>
              </div>
            </label>
            <input
              type="file"
              id="upload"
              className="hidden w-0 h-0"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
            {/* Preview Gambar */}
            {images.map((image, index) => (
              <div key={index} className="relative w-36 h-36">
                <img
                  src={isUpdate ? image.preview || image : image.preview}
                  alt={`Product preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl border border-gray-300 shadow"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index, image)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full cursor-pointer"
                >
                  <IoMdClose size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Input
          title={"Nama Menu"}
          type={"text"}
          name={"name"}
          id={"name"}
          placeholder={"Masukkan nama menu"}
          required
        />

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Kategori</h3>
          <select
            name="category"
            id="category"
            required
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5"
          >
            <option value="" selected disabled>
              Pilih Kategori
            </option>
            <option value="kue">Kue</option>
            <option value="biskuit">Biskuit</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Harga</h3>
          <div className="relative w-full">
            <span className="absolute p-2 top-1/2 transform -translate-y-1/2 text-[#1D6F64] text-md font-medium sm:text-base lg:text-sm">
              Rp
            </span>
            <input
              type="text"
              // value={formatPrice(price)}
              // onChange={handlePriceChange}
              placeholder="Masukkan harga"
              min={1000}
              required
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full pl-10 p-2.5"
            />
          </div>
        </div>

        <Input
          title={"Berat"}
          type={"number"}
          name={"weight"}
          id={"weight"}
          min={1}
          required
          placeholder={"Masukkan berat"}
        />
        <p className="text-xs text-gray-500">*dalam gram</p>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Apakah Pre-order?</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                name="isPreOrder"
                id="isPreOrderYes"
                value="yes"
                className="h-4 w-4"
              />
              <label
                htmlFor="isPreOrderYes"
                className="ml-1.5 block text-sm font-medium text-gray-700"
              >
                Ya
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="isPreOrder"
                id="isPreOrderNo"
                value="no"
                className="h-4 w-4"
              />
              <label
                htmlFor="isPreOrderNo"
                className="ml-1.5 block text-sm font-medium text-gray-700"
              >
                Tidak
              </label>
            </div>
          </div>
        </div>

        <Input
          title={"Estimasi Pre-order"}
          type={"number"}
          name={"preOrderEstimate"}
          id={"preOrderEstimate"}
          min={1}
          placeholder={"Masukkan estimasi pre-order"}
        />

        <Input
          title={"Stok"}
          type={"number"}
          name={"stock"}
          id={"stock"}
          min={1}
          placeholder={"Masukkan stok"}
          required
        />

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Deskripsi</h3>
          <textarea
            name="description"
            id="description"
            rows={4}
            placeholder="Masukkan deskripsi"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5"
          />
        </div>

        <div className="flex flex-row justify-end gap-4 items-center mt-3">
          <Link to="/admin/menus">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 transition-colors duration-300 font-medium rounded-xl w-auto px-5 py-2.5 text-center cursor-pointer"
            >
              Batal
            </button>
          </Link>
          <button
            type="submit"
            className="bg-[#1D6F64] hover:bg-[#2a4d48] focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer"
          >
            {isUpdate ? "Ubah Menu" : "Tambah Menu"}
          </button>
        </div>
      </form>
    </div>
  );
};
