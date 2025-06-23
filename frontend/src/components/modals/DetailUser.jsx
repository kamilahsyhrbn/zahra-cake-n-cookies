import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const DetailUser = ({ data, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex md:items-center justify-center z-50 overflow-y-auto">
      <div
        className={`bg-white p-8 w-full h-max md:max-w-xl rounded-lg transform transition-all duration-300 m-5 ${
          show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-center font-semibold text-xl">Detail Pelanggan</h2>

        <div className="flow-root my-10">
          <div className="flex justify-center mb-5">
            <img
              src={"/avatar.png"}
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Nama</dt>
              <dd className="text-gray-700 sm:col-span-2">John Doe</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Email</dt>
              <dd className="text-gray-700 sm:col-span-2 flex items-center justify-between">
                johndoe@gmail.com
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Nomor Telepon</dt>
              <dd className="text-gray-700 sm:col-span-2">081234567890</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Alamat</dt>
              <dd className="text-gray-700 sm:col-span-2">
                Jl. Contoh No. 123, Kota Contoh
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Tanggal Bergabung</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {format(new Date("2023-01-01"), "dd MMMM yyyy", {
                  locale: id,
                })}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg ml-2 transition-colors duration-300 cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
