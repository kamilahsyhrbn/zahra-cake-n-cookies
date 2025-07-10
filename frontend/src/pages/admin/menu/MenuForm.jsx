import React, { useEffect, useState } from "react";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { Input } from "../../../components/pages/admin/Input";
import { IoMdClose } from "react-icons/io";
import useMenuStore from "../../../store/menuStore";
import useCategoryStore from "../../../store/categoryStore";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/common/Toast";

export const MenuForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 500,
    weight: 1,
    description: "",
    isPreOrder: false,
    preOrderEst: 1,
    stock: 1,
    images: [],
  });
  const { getMenuById, createMenu, updateMenu, isLoading } = useMenuStore();
  const { getAllCategories, categories } = useCategoryStore();

  useEffect(() => {
    if (id) {
      setIsUpdate(true);

      const fetchMenu = async () => {
        try {
          const menu = await getMenuById(id);

          setFormData({
            name: menu.data.name,
            category: menu.data.category._id,
            price: menu.data.price,
            weight: menu.data.weight,
            description: menu.data.description,
            isPreOrder: menu.data.isPreOrder,
            preOrderEst: menu.data.preOrderEst,
            stock: menu.data.stock,
            images: menu.data.images,
          });
        } catch (error) {
          console.log("Error in getting menu by id", error);
          showErrorToast(error.response.data.message || "Terjadi kesalahan");
        }
      };

      fetchMenu();
    }
  }, [id, getMenuById]);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...newImages].slice(0, 10),
    }));
  };

  const removeImage = (indexToRemove, imageId) => {
    setDeletedImages((prevDeletedImages) => [...prevDeletedImages, imageId]);
    const filteredImages = formData.images.filter(
      (_, index) => index !== indexToRemove
    );

    setFormData((prevData) => ({
      ...prevData,
      images: filteredImages,
    }));
  };

  const handleFormChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "isPreOrder"
          ? value === "yes"
            ? true
            : false
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.images ||
      !formData.price ||
      !formData.weight ||
      !formData.category ||
      !formData.stock
    ) {
      showErrorToast("");
      return;
    }

    const requiredFields = [
      { field: formData.name, message: "Nama Menu harus diisi" },
      { field: formData.category, message: "Kategori harus diisi" },
      {
        field: formData.images,
        message: "Foto Menu harus diisi minimal 1 foto",
      },
      { field: formData.price, message: "Harga harus diisi" },
      { field: formData.weight, message: "Berat harus diisi" },
      { field: formData.category, message: "Kategori harus diisi" },
      { field: formData.stock, message: "Stok harus diisi" },
    ];

    const errorField = requiredFields.find(({ field }) => !field);

    if (errorField) {
      showErrorToast(errorField.message);
      return;
    }

    if (formData.images.length < 1) {
      showErrorToast("Foto Menu harus diisi minimal 1 foto");
      return;
    }

    if (formData.images.length > 10) {
      showErrorToast("Foto Menu tidak boleh lebih dari 10 foto");
      return;
    }

    if (
      formData.images.some(
        (image) => image.file && image.file.size > 5 * 1024 * 1024
      )
    ) {
      showErrorToast("Foto Menu tidak boleh lebih dari 5MB");
      return;
    }

    if (formData.stock < 0) {
      showErrorToast("Stok tidak boleh kurang dari 0");
      return;
    }

    if (formData.weight < 0) {
      showErrorToast("Berat tidak boleh kurang dari 0");
      return;
    }

    if (formData.price < 500) {
      showErrorToast("Harga tidak boleh kurang dari 500");
      return;
    }

    if (formData.isPreOrder && formData.preOrderEst < 0) {
      showErrorToast("Estimasi pre-order tidak boleh kurang dari 0");
      return;
    }

    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("weight", formData.weight);
    data.append("description", formData.description);
    data.append("isPreOrder", formData.isPreOrder);
    data.append("preOrderEst", formData.preOrderEst);
    data.append("stock", formData.stock);

    formData.images.forEach((image, index) => {
      data.append("images", image.file);
    });

    if (deletedImages.length > 0) {
      deletedImages.forEach((imageId) => {
        data.append("deletedImages", imageId);
      });
    }

    let response;
    if (isUpdate) {
      response = await updateMenu(id, data);
    } else {
      response = await createMenu(data);
    }
    if (response?.success) {
      if (isUpdate) {
        showSuccessToast("Menu berhasil diubah");
      } else {
        showSuccessToast("Menu berhasil ditambahkan");
      }
      navigate("/admin/menus");

      setFormData({
        name: "",
        category: "",
        price: 0,
        weight: 0,
        description: "",
        isPreOrder: false,
        preOrderEst: 0,
        stock: 0,
        images: [],
      });
      setDeletedImages([]);
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div>
      <TitleCard title={`${isUpdate ? "Ubah" : "Tambah"} Menu`} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
              name="images"
              multiple
              className="hidden w-0 h-0"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {/* Preview Gambar */}
            {formData.images.map((image, i) => (
              <div key={i} className="relative w-36 h-36">
                <img
                  src={isUpdate ? image.preview || image : image.preview}
                  alt={`Menu preview ${i + 1}`}
                  className="w-full h-full object-cover rounded-xl border border-gray-300 shadow"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i, image)}
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
          value={formData.name}
          onChange={handleFormChange}
        />

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Kategori</h3>
          <select
            name="category"
            id="category"
            required
            value={formData.category}
            onChange={handleFormChange}
            className="border border-gray-300 text-gray-900 text-sm capitalize rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5"
          >
            <option value="" selected disabled>
              Pilih Kategori
            </option>
            {categories.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Harga</h3>
          <div className="relative w-full">
            <span className="absolute p-2 top-1/2 transform -translate-y-1/2 text-[#1D6F64] text-md font-medium sm:text-base lg:text-sm">
              Rp
            </span>
            <input
              type="number"
              name="price"
              placeholder="Masukkan harga"
              min={1000}
              required
              value={formData.price}
              onChange={handleFormChange}
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
          value={formData.weight}
          onChange={handleFormChange}
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
                onChange={handleFormChange}
                checked={formData.isPreOrder === true}
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
                onChange={handleFormChange}
                checked={formData.isPreOrder === false}
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

        {formData.isPreOrder && (
          <Input
            title={"Estimasi Pre-order"}
            type={"number"}
            name={"preOrderEst"}
            id={"preOrderEst"}
            min={1}
            placeholder={"Masukkan estimasi pre-order"}
            value={formData.preOrderEst}
            onChange={handleFormChange}
          />
        )}

        <Input
          title={"Stok"}
          type={"number"}
          name={"stock"}
          id={"stock"}
          min={1}
          placeholder={"Masukkan stok"}
          required
          value={formData.stock}
          onChange={handleFormChange}
        />

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Deskripsi</h3>
          <textarea
            name="description"
            id="description"
            rows={4}
            placeholder="Masukkan deskripsi"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#54B0A2] focus:border-[#54B0A2] block w-full p-2.5"
            value={formData.description}
            onChange={handleFormChange}
          />
        </div>

        <div className="flex flex-row justify-end gap-4 items-center mt-3">
          <Link to="/admin/menus">
            <button
              type="button"
              disabled={isLoading}
              className="bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 transition-colors duration-300 font-medium rounded-xl w-auto px-5 py-2.5 text-center cursor-pointer"
            >
              Batal
            </button>
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#1D6F64] hover:bg-[#2a4d48] focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer disabled:bg-[#1D6F64]/50"
          >
            {isLoading ? "Memuat..." : isUpdate ? "Ubah Menu" : "Tambah Menu"}
          </button>
        </div>
      </form>
    </div>
  );
};
