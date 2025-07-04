import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import useReviewStore from "../../store/reviewStore";
import { showErrorToast, showSuccessToast } from "../common/Toast";
import { IoStar } from "react-icons/io5";
import { formatCurrency } from "../../utils/formatNumber";

export const Review = ({ data, onClose }) => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(data?._id);
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState(
    data?.items
      ?.filter((item) => !item.isReviewed)
      .map((menu) => ({
        menuId: menu.menu._id,
        rating: 0,
        comment: "",
      }))
  );
  const { createReview, isLoading } = useReviewStore();

  useEffect(() => {
    setShow(true);
  }, []);

  const handleChange = (index, field, value) => {
    setFormData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleReview = async (e) => {
    e.preventDefault();

    let allSuccess = true;

    for (const review of formData) {
      if (!review.rating) {
        showErrorToast("Berikan penilaian terlebih dahulu");
        return;
      }

      const data = {
        orderId: orderId,
        menuId: review.menuId,
        rating: review.rating,
        comment: review.comment,
      };

      const response = await createReview(data);
      if (!response.success) {
        allSuccess = false;
        showErrorToast(response?.data?.message || "Terjadi kesalahan");
      }
    }

    if (allSuccess) {
      showSuccessToast("Ulasan berhasil dibuat");
      navigate(`/detail-menu/${formData[0].menuId}`);
      onClose();
    } else {
      showErrorToast("Beberapa ulasan gagal dikirim");
    }
  };
  console.log("data", data);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-50">
      <div
        className={`bg-white p-8 rounded-lg transform transition-all duration-300 mx-5 mt-10 ${
          show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          Bagikan penilaianmu untuk menu ini!
        </h2>

        <form onSubmit={handleReview}>
          <div className="max-h-[500px] overflow-y-auto pr-2">
            {data?.items
              ?.filter((item) => !item.isReviewed)
              .map((menuItem, index) => (
                <div
                  key={menuItem.menu._id}
                  className="mb-6 border-b border-gray-300 pb-4"
                >
                  {/* MENU INFO */}
                  <div className="flex gap-4 mb-4">
                    <img
                      src={menuItem.menu.images[0]}
                      alt={menuItem.menu.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <h5 className="font-medium">{menuItem.menu.name}</h5>
                      <h5 className="font-medium text-sm">
                        {formatCurrency(
                          menuItem.menu.price * menuItem.quantity
                        )}
                      </h5>
                    </div>
                  </div>

                  {/* RATING */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleChange(index, "rating", star)}
                          className="bg-transparent border-none cursor-pointer"
                        >
                          <IoStar
                            size={24}
                            color={
                              star <= formData[index].rating
                                ? "#FFD700"
                                : "#D3D3D3"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* REVIEW */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Ulasan
                    </label>
                    <textarea
                      rows="4"
                      value={formData[index].comment}
                      onChange={(e) =>
                        handleChange(index, "comment", e.target.value)
                      }
                      placeholder="Tulis ulasanmu disini..."
                      className="block p-2.5 w-full text-sm resize-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-secondary focus:border-secondary focus:outline-none"
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end">
            <button
              className="bg-gray-300 hover:bg-gray-400 transition-colors duration-300 text-gray-600 hover:text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onClose}
              type="button"
              disabled={isLoading}
            >
              Batal
            </button>
            <button
              className="bg-[#54B0A2] hover:bg-[#1D6F64] transition-colors duration-300 text-white px-4 py-2 rounded-lg ml-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
