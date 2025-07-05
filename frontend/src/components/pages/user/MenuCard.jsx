import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatNumber";
import useAuthStore from "../../../store/authStore";
import { useEffect, useState } from "react";
import useMenuStore from "../../../store/menuStore";
import { showErrorToast, showSuccessToast } from "../../common/Toast";

export const MenuCard = ({ menu }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { likeUnlikeMenu, isLikeLoading } = useMenuStore();
  const [isLiked, setIsLiked] = useState(
    menu?.likes?.includes(currentUser?._id) || false
  );

  useEffect(() => {
    if (menu && currentUser) {
      setIsLiked(menu.likes.includes(currentUser._id));
    }
  }, []);

  const handleLike = async () => {
    try {
      const response = await likeUnlikeMenu(menu._id);

      if (response.success) {
        setIsLiked(!isLiked);
        showSuccessToast(response.message);
      }
    } catch (error) {
      showErrorToast(error.response.data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="bg-white shadow-lg hover:shadow-2xl rounded-lg min-w-72 md:min-w-90 hover:scale-105 transition duration-300 ease-in-out border-gray-300">
      <div className="flex flex-col">
        <div className="relative">
          <img
            src={menu.images[0]}
            alt={menu.name}
            className="w-full h-56 object-cover rounded-t-lg cursor-pointer"
            onClick={() => navigate(`/detail-menu/${menu?._id}`)}
          />
          {menu?.stock === 0 && (
            <div
              className="absolute inset-0 bg-black/50 grid place-items-center rounded-t-lg cursor-pointer"
              onClick={() => navigate(`/detail-menu/${menu?._id}`)}
            >
              <p className="text-white font-bold">HABIS</p>
            </div>
          )}

          {menu?.isPreOrder && (
            <div
              className="absolute top-2 left-2 bg-[#F2FDFC] py-1.5 px-2 rounded-full z-10 border border-gray-300 cursor-pointer"
              onClick={() => navigate(`/detail-menu/${menu?._id}`)}
            >
              <p className="text-sm font-semibold">PRE ORDER</p>
            </div>
          )}

          {currentUser && currentUser.role === "user" && (
            <button
              onClick={() => handleLike(menu?._id)}
              className="absolute top-2 right-2 bg-white p-1.5 rounded-full z-10 border border-gray-300 cursor-pointer"
            >
              {isLikeLoading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-6 h-5 text-[#1D6F64] animate-spin"
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
            </button>
          )}
        </div>
        <div className="flex flex-col p-4">
          <h2
            className="text-lg font-bold truncate cursor-pointer"
            onClick={() => navigate(`/detail-menu/${menu?._id}`)}
          >
            {menu.name}
          </h2>
          <p
            className="text-nowrap cursor-pointer font-semibold mb-2"
            onClick={() => navigate(`/detail-menu/${menu._id}`)}
          >
            {formatCurrency(menu.price)}
          </p>
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="flex items-center gap-1">
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
              {menu.averageRating.toFixed(1)}
            </p>
            <p>|</p>
            <p>{menu.totalSold} terjual</p>
          </div>

          <Link to={`/detail-menu/${menu._id}`} className="flex justify-end">
            <button className="border border-[#1D6F64] hover:bg-[#1D6F64] hover:text-white py-2 rounded-2xl w-max px-4 transition duration-300 cursor-pointer">
              Lihat Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
