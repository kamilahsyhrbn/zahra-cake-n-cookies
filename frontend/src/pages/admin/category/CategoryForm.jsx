import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Input } from "../../../components/pages/admin/Input";

export const CategoryForm = () => {
  const location = useLocation();
  const [isUpdate, setIsUpdate] = useState(true);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (location.pathname === "/admin/category-form") {
      setIsUpdate(false);
    }
  }, [location]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <TitleCard title={`${isUpdate ? "Ubah" : "Tambah"} Kategori`} />

      <form className="flex flex-col gap-4">
        <Input
          title={"Nama Kategori"}
          type={"text"}
          name={"category"}
          id={"category"}
          placeholder={"Masukkan nama kategori"}
        />

        <Input
          title={"Deskripsi"}
          type={"text"}
          name={"description"}
          id={"description"}
          placeholder={"Masukkan deskripsi kategori"}
        />

        <div className="flex items-center gap-6">
          <label
            htmlFor="File"
            className="rounded border border-gray-300 p-4 text-gray-900 shadow-sm cursor-pointer w-48 h-48 flex items-center justify-center text-center"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="font-medium text-sm text-center">
                Upload Gambar
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                />
              </svg>
            </div>
            <input
              type="file"
              id="File"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-48 h-48 object-cover rounded shadow-md"
            />
          )}
        </div>

        <div className="flex flex-row justify-end gap-4 items-center">
          <Link to="/admin/categories">
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
            {isUpdate ? "Ubah Kategori" : "Tambah Kategori"}
          </button>
        </div>
      </form>
    </div>
  );
};
