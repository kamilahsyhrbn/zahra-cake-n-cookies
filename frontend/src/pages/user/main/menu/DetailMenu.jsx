import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useMenuStore from "../../../../store/menuStore";
import { Loader } from "../../../../components/common/Loader";
import { motion } from "framer-motion";
import useAuthStore from "../../../../store/authStore";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common/Toast";
import { formatCurrency } from "../../../../utils/formatNumber";
import useCartStore from "../../../../store/cartStore";
import { ReviewCard } from "../../../../components/pages/user/ReviewCard";
import { MenuCard } from "../../../../components/pages/user/MenuCard";
import useReviewStore from "../../../../store/reviewStore";

export const DetailMenu = () => {
  const {
    selectedMenu,
    getMenuById,
    isLoading,
    likeUnlikeMenu,
    isLikeLoading,
    getRecommendationsMenu,
    recommendations,
  } = useMenuStore();
  const { currentUser } = useAuthStore();
  const { addToCart, isLoading: cartLoading } = useCartStore();
  const { getAllReviews, reviews } = useReviewStore();

  const { id } = useParams();

  const [mainImage, setMainImage] = useState(selectedMenu?.images[0]);
  const [likes, setLikes] = useState(selectedMenu?.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(
    selectedMenu?.likes?.includes(currentUser?._id) || false
  );
  const [count, setCount] = useState(1);
  const [filter, setFilter] = useState({
    sort: "newest",
    rating: 0,
  });

  useEffect(() => {
    getMenuById(id);
    getRecommendationsMenu(id);
  }, [id]);

  useEffect(() => {
    getAllReviews(id, filter.sort, filter.rating);
  }, [filter, id]);

  useEffect(() => {
    setIsLiked(selectedMenu?.likes?.includes(currentUser?._id) || false);
    setLikes(selectedMenu?.likes?.length || 0);

    if (selectedMenu) {
      setMainImage(selectedMenu.images[0]);
    }
  }, [selectedMenu, currentUser]);

  const handleLike = async () => {
    try {
      const response = await likeUnlikeMenu(selectedMenu._id);

      if (response.success) {
        setIsLiked(!isLiked);
        showSuccessToast(response.message);
        setLikes(isLiked ? likes - 1 : likes + 1);
      }
    } catch (error) {
      showErrorToast(error.response.data.message || "Terjadi kesalahan");
    }
  };

  const handleAddToCart = async () => {
    const data = {
      menuId: selectedMenu._id,
      quantity: count,
    };
    const response = await addToCart(data);
    if (response.success) {
      showSuccessToast("Menu berhasil ditambahkan ke keranjang");
      setCount(1);
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

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
    <motion.div
      className="container mb-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      {/* STEPPER */}
      <nav className="text-sm text-accent pt-4">
        <Link to="/" className="hover:underline hover:text-[#1D6F64]">
          Beranda
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <Link to="/menus" className="hover:underline hover:text-[#1D6F64]">
          Menu
        </Link>{" "}
        <span className="text-[#1D6F64] font-medium">{">"}</span>{" "}
        <span className="text-gray-800 font-semibold">Detail Menu</span>
      </nav>

      {!selectedMenu ? (
        <div className="flex flex-col justify-center items-center gap-2 text-center min-h-svh">
          <img
            src="/menu-notfound.svg"
            alt="Error"
            className="md:w-1/2 lg:w-5/12 h-auto mb-5"
          />
          <h2 className="text-2xl font-semibold">Menu tidak ditemukan</h2>
        </div>
      ) : (
        <div className="flex flex-col items-center md:items-start md:flex-row gap-6 mb-10 mt-5">
          <div className="md:w-7/12 w-full lg:w-5/12 relative">
            <motion.img
              key={mainImage}
              src={mainImage}
              alt="Detail Menu"
              className="md:w-full rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            {selectedMenu?.isPreOrder && (
              <div
                className="absolute top-2 left-2 bg-[#F2FDFC] py-1.5 px-2 rounded-full z-10 border border-gray-300"
                onClick={() => navigate(`/detail-menu/${menu?._id}`)}
              >
                <p className="text-sm font-semibold">PRE ORDER</p>
              </div>
            )}
            {currentUser && currentUser.role === "user" && (
              <button
                className="absolute top-2 right-2 bg-white p-1.5 rounded-full z-10"
                onClick={() => handleLike(selectedMenu?._id)}
              >
                {isLikeLoading ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-5 h-5 text-[#1D6F64] animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg
                    fill={isLiked ? "#ff2525" : "#a8a8a8"}
                    className="w-5 h-5 hover:fill-[#ff2525] transition-colors duration-300 ease-in-out cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                  </svg>
                )}
                <p className="text-xs mt-1">{likes}</p>
              </button>
            )}
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {selectedMenu?.images?.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 rounded-lg cursor-pointer object-cover ${
                    mainImage === thumb ? "border-2 border-[#1D6F64]" : ""
                  }`}
                  onClick={() => setMainImage(thumb)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-2xl font-medium">{selectedMenu?.name}</h2>
            <h4 className="font-medium text-lg">
              {formatCurrency(selectedMenu?.price)}
            </h4>
            <p className="text-sm flex items-center gap-1">
              Terjual {selectedMenu?.totalSold}{" "}
              <span className="text-lg">•</span>{" "}
              <span className="flex items-center gap-1">
                <svg
                  fill="#FFD700"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  id="star"
                  data-name="Flat Color"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon flat-color"
                >
                  <path
                    id="primary"
                    d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z"
                  />
                </svg>{" "}
                {selectedMenu.averageRating.toFixed(1)}
              </span>
              <span className="text-lg">•</span> Kategori:{" "}
              <span className="capitalize">{selectedMenu?.category?.name}</span>
              <span className="text-lg">•</span> Berat: {selectedMenu?.weight}gr
            </p>

            <p className="whitespace-pre-line">{selectedMenu?.description}</p>

            <p
              className={`text-sm ${
                selectedMenu?.isPreOrder ? "mt-5" : "my-5"
              } `}
            >
              Stok: {selectedMenu?.stock}
            </p>

            {selectedMenu?.isPreOrder && (
              <p className="text-sm mb-5 text-gray-500">
                akan dikirim dalam waktu {selectedMenu?.preOrderEst} hari
              </p>
            )}

            {currentUser && currentUser?.role === "user" ? (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 bg-gray-100 py-3 px-4 rounded-xl">
                  <button
                    className="px-2 cursor-pointer disabled:cursor-not-allowed"
                    onClick={() => setCount(count - 1)}
                    disabled={count === 1}
                  >
                    -
                  </button>
                  <span className="">{count}</span>
                  <button
                    className="px-2 cursor-pointer disabled:cursor-not-allowed"
                    onClick={() => setCount(count + 1)}
                    disabled={
                      count === selectedMenu?.stock || selectedMenu?.stock === 0
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={selectedMenu?.stock === 0 || cartLoading}
                  className="w-full bg-[#1D6F64] max-sm:text-sm hover:bg-[#2a4d48] focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer disabled:bg-[#1D6F64]/50"
                >
                  Tambah ke Keranjang
                </button>
              </div>
            ) : currentUser && currentUser?.role === "admin" ? (
              ""
            ) : (
              <Link to="/login">
                <button className="w-full bg-[#1D6F64] max-sm:text-sm hover:bg-[#2a4d48] focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer disabled:bg-[#1D6F64]/50">
                  Masuk untuk membeli
                </button>
              </Link>
            )}
          </div>
        </div>
      )}

      <section>
        <h2 className="text-xl font-semibold mt-4 mb-2">Ulasan</h2>
        <div className="flex gap-10 items-center mb-5">
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
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Filter:</label>
            <select
              name="rating"
              onChange={handleFilterChange}
              value={filter.rating}
              className="flex items-center w-max pl-3 pr-5 py-1 bg-white text-black shadow-md rounded-lg ring-2 ring-[#1D6F64] hover:bg-[#1D6F64] hover:ring-[#1D6F64] hover:text-white text-sm cursor-pointer focus:outline-none capitalize"
            >
              <option value="">Semua</option>
              <option value="1">Bintang 1</option>
              <option value="2">Bintang 2</option>
              <option value="3">Bintang 3</option>
              <option value="4">Bintang 4</option>
              <option value="5">Bintang 5</option>
            </select>
          </div>
        </div>
        {reviews && reviews?.length === 0 ? (
          <p className="text-sm text-gray-500">
            Belum ada ulasan untuk menu ini.
          </p>
        ) : (
          <div className="overflow-x-auto px-2">
            <div
              className={`grid ${
                reviews.length === 1
                  ? "grid-cols-1"
                  : reviews.length === 2
                  ? "grid-cols-2"
                  : "grid-rows-3"
              }  grid-flow-col auto-cols-[100%] gap-3`}
            >
              {reviews.map((review) => (
                <div key={review._id} className="w-full">
                  <ReviewCard data={review} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-10 mb-2">
          Rekomendasi menu lainnya
        </h2>

        <div className="flex flex-row flex-nowrap gap-4 items-center overflow-x-scroll pb-10 px-2">
          {recommendations.map((recommendation) => (
            <MenuCard key={recommendation._id} menu={recommendation} />
          ))}
        </div>
      </section>
    </motion.div>
  );
};
