import React, { useEffect, useState } from "react";
import { TitleLine } from "../../../../components/pages/user/TitleLine";
import { Link, useLocation, useParams } from "react-router-dom";
import useCategoryStore from "../../../../store/categoryStore";
import { MenuCard } from "../../../../components/pages/user/MenuCard";
import useMenuStore from "../../../../store/menuStore";
import { Loader } from "../../../../components/common/Loader";
import { motion } from "framer-motion";

export const Menu = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const { categories, getAllCategories } = useCategoryStore();
  const { menus, getAllMenus, isLoading } = useMenuStore();
  const [filter, setFilter] = useState({
    category: category || "",
    sort: "newest",
  });

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getAllMenus(filter);
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

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
        <span className="text-gray-800 font-semibold">Menu</span>
      </nav>

      {/* TITLE */}
      <TitleLine title="Menu" />

      {/* FILTERING */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Kategori:</label>
          <select
            className="flex items-center w-max pl-3 pr-5 py-1 bg-white text-black shadow-md rounded-lg ring-2 ring-[#1D6F64] hover:bg-[#1D6F64] hover:ring-[#1D6F64] hover:text-white text-sm cursor-pointer focus:outline-none capitalize"
            name="category"
            value={filter.category}
            onChange={handleFilterChange}
          >
            <option value="">Semua</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Urutkan:</label>
          <select
            name="sort"
            onChange={handleFilterChange}
            value={filter.sort}
            className="flex items-center w-max pl-3 pr-5 py-1 bg-white text-black shadow-md rounded-lg ring-2 ring-[#1D6F64] hover:bg-[#1D6F64] hover:ring-[#1D6F64] hover:text-white text-sm cursor-pointer focus:outline-none capitalize"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="price-asc">Harga Tertinggi</option>
            <option value="price-desc">Harga Terendah</option>
            <option value="top-menus">Terlaris</option>
          </select>
        </div>
      </div>

      {/* MENU */}
      {menus && menus.length === 0 ? (
        <p className="text-center text-gray-500 my-10">Tidak ada menu</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 my-10 w-full justify-items-center md:justify-items-start"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {menus &&
            menus.map((menu) => <MenuCard key={menu._id} menu={menu} />)}
        </motion.div>
      )}
    </div>
  );
};

export default Menu;
