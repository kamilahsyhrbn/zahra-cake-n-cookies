import React, { useEffect, useState } from "react";
import { formatDate } from "../../../utils/formatNumber";
import Danger from "../../modals/Danger";

import useAuthStore from "../../../store/authStore";
import useReviewStore from "../../../store/reviewStore";
import { showErrorToast, showSuccessToast } from "../../common/Toast";

export const ReviewCard = ({ data }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { currentUser } = useAuthStore();
  const { deleteReview } = useReviewStore();

  const handleModalDelete = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  const handleDelete = async () => {
    const response = await deleteReview(data?._id);

    if (response?.success) {
      showSuccessToast("Review berhasil dihapus");
      setIsDeleteOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="min-w-full md:min-w-1/2 min-h-32 border border-[#1D6F64] rounded-xl p-3">
      <div className="flex flex-col-reverse md:flex-row gap-1 justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <img
              src={data?.user?.image || "/avatar.png"}
              alt={data?.user?.name}
              className="w-6 h-6 rounded-full"
            />
            <h4 className="font-medium">{data?.user?.name}</h4>
          </div>
          <div className="flex items-center">
            {Array.from({ length: data?.rating }).map((_, i) => (
              <svg
                fill="#FFD700"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                id="star"
                data-name="Flat Color"
                xmlns="http://www.w3.org/2000/svg"
                className="icon flat-color"
                key={i}
              >
                <path
                  id="primary"
                  d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z"
                />
              </svg>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">
            {formatDate(new Date(data?.createdAt))}
          </p>
        </div>
      </div>

      <p className="my-3">{data?.comment}</p>

      {(data?.user?._id === currentUser?._id ||
        currentUser?.role === "admin") && (
        <button
          onClick={handleModalDelete}
          className="text-gray-400 hover:text-red-500 cursor-pointer hover:font-medium"
        >
          Hapus
        </button>
      )}

      {isDeleteOpen && (
        <Danger
          title="Hapus Ulasan"
          message="Apakah anda yakin ingin menghapus ulasan ini?"
          onSubmit={handleDelete}
          onClose={handleModalDelete}
        />
      )}
    </div>
  );
};
