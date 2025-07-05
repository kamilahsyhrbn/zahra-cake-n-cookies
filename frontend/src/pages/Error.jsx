import React from "react";
import { Link, useRouteError } from "react-router-dom";

export const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="bg-gray-200 min-h-svh flex justify-center items-center">
      <div className="mx-5 bg-white p-10 rounded-2xl flex flex-col justify-center items-center gap-3 max-w-3xl">
        <h1 className="text-3xl text-bold">Oops!</h1>
        <p className="text-center">Maaf, terjadi kesalahan.</p>
        <p className="text-center">
          Silakan kembali ke halaman sebelumnya atau hubungi admin.
        </p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to={-1}>
          <button className="p-2 bg-[#5c8f87] rounded-lg mt-3 hover:bg-[#3c6f66] cursor-pointer text-white">
            Kembali
          </button>
        </Link>
      </div>
    </div>
  );
};
