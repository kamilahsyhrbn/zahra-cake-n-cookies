import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useMenuStore from "../../../store/menuStore";
import { MenuCard } from "../../../components/pages/user/MenuCard";
import { Loader } from "../../../components/common/Loader";

export const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { searchMenu, searchResult, isLoading } = useMenuStore();

  useEffect(() => {
    if (query) {
      searchMenu(query);
    }
  }, [query]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mb-10">
      {/* STEPPER */}
      <nav className="text-sm text-accent pt-4">
        <Link to="/" className="hover:underline hover:text-[#1D6F64]">
          Beranda
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">Hasil Pencarian</span>
      </nav>

      <section className="flex flex-col justify-center items-start my-6">
        <h2 className="text-2xl font-semibold text-left">
          Hasil Pencarian "<span className="text-[#1D6F64]">{query}</span>"
        </h2>
      </section>

      {searchResult && searchResult?.length === 0 ? (
        <p className="text-center text-gray-500 my-10">
          Hasil pencarian tidak ditemukan.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 my-10 w-full">
          {searchResult.map((menu) => (
            <MenuCard key={menu._id} menu={menu} />
          ))}
        </div>
      )}
    </div>
  );
};
