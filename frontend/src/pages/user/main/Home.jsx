import React, { useEffect } from "react";
import { TitleDesc } from "../../../components/pages/user/TitleDesc";
import { Link } from "react-router-dom";
import useCategoryStore from "../../../store/categoryStore";
import { Loader } from "../../../components/common/Loader";
import useMenuStore from "../../../store/menuStore";
import { MenuCard } from "../../../components/pages/user/MenuCard";
import { motion } from "framer-motion";
import { Hero } from "../../../components/pages/user/Hero";

export const Home = () => {
  const { getAllCategories, categories } = useCategoryStore();
  const { getBestSelling, bestSelling, isLoading, getAllMenus, menus } =
    useMenuStore();

  useEffect(() => {
    getAllCategories();
    getBestSelling();
    getAllMenus({ category: "", sort: "newest" });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* HERO SECTION */}
      <Hero />
      {/* CATEGORIES SECTION */}
      <motion.section
        className="container flex flex-col justify-center gap-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <TitleDesc
          title="Belanja Berdasarkan Kategori"
          desc="Temukan cake dan cookies favoritmu lebih cepat. Pilih kategori sesuai selera dan pesan dengan mudah kapan saja."
        />
        {categories && categories.length === 0 ? (
          <p className="text-center text-gray-500 text-sm italic">
            Kategori belum tersedia
          </p>
        ) : (
          <div className="flex w-full flex-row flex-wrap justify-center gap-4 md:gap-8">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category._id}
                to={`/menus?category=${category._id}`}
                className="flex flex-col gap-2 items-center w-max justify-center hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <img
                  src={category.image || "./no-image.png"}
                  alt={category.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <p className="text-center font-medium capitalize">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </motion.section>
      {/* BEST SELLING SECTION */}
      <motion.section
        className="container flex flex-col justify-center gap-4 my-8 md:my-16 lg:my-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h4 className="font-semibold text-2xl">
            Coba Penjualan Terbaik Kami
          </h4>
          <div className="w-27 md:w-1.5 h-1.5 md:h-auto bg-[#1D6F64]"></div>
          <p>
            Cobalah menu yang paling banyak disukai pelanggan setia kami! Rasa
            lezat dan kualitas premium yang selalu bikin ketagihan!
          </p>
        </div>
        <div>
          {bestSelling && bestSelling.length === 0 ? (
            <p className="text-center text-gray-500 text-sm italic">
              Menu belum tersedia
            </p>
          ) : (
            <div className="flex flex-row flex-nowrap gap-4 items-center overflow-x-scroll pb-10 px-2 md:mt-5">
              {bestSelling.slice(0, 3).map((menu) => (
                <MenuCard key={menu._id} menu={menu} />
              ))}
            </div>
          )}
        </div>
      </motion.section>
      {/* CTA SECTION */}
      <motion.section
        className="bg-[#54B0A2]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-8 md:p-12 lg:px-16">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Pesan Sekarang & Manjakan Dirimu!
            </h2>

            <p className="mt-4 text-slate-100">
              Klik tombol di bawah untuk memesan cake dan cookies pilihanmu hari
              ini. Kami siap mengantar kebahagiaan manis langsung ke rumahmu.
            </p>
          </div>

          <Link to="/menus" className="mt-8 flex justify-center">
            <button className="relative w-max flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-secondary focus:outline-none cursor-pointer">
              Beli Sekarang
            </button>
          </Link>
        </div>
      </motion.section>
      {/* NEW MENU SECTION */}
      <motion.section
        className="container flex flex-col justify-center gap-4 my-8 md:my-16 lg:my-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <TitleDesc
          title="Menu Terbaru"
          desc="Coba varian cake dan cookies terbaru kami yang dibuat dengan resep istimewa dan bahan berkualitas."
        />
        <div>
          {menus && menus.length === 0 ? (
            <p className="text-center text-gray-500 text-sm italic">
              Menu belum tersedia
            </p>
          ) : (
            <div className="flex flex-row flex-nowrap gap-4 items-center overflow-x-scroll pb-10 px-2 md:mt-5">
              {menus
                .filter((menu) => menu.stock > 0)
                .slice(0, 3)
                .map((menu) => (
                  <MenuCard key={menu._id} menu={menu} />
                ))}
            </div>
          )}
        </div>

        <Link to="/menus" className="flex justify-center">
          <button className="bg-transparent w-max border border-[#54B0A2] hover:bg-[#1D6F64] hover:border-[#1D6F64] hover:text-white transition-colors duration-300 px-4 py-2 rounded-xl cursor-pointer">
            Lihat Semua
          </button>
        </Link>
      </motion.section>
    </div>
  );
};
