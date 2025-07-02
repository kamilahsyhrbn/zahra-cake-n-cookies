import React, { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../common/Toast";
import useUserStore from "../../store/userStore";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { IoMdRefresh } from "react-icons/io";
import captcha from "../../../public/captcha.png";
import useOrderStore from "../../store/orderStore";

export const DeletAccount = ({ onClose }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [captchaCode, setCaptchaCode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isValid, setIsValid] = useState(false);

  const { deleteUser, isLoading } = useUserStore();
  const { currentUser } = useAuthStore();
  const { getUserOrder, orders } = useOrderStore();

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    if (step === 2) {
      getUserOrder();
    }
  }, [step]);

  // UNTUK MELANJUTKAN KE MODAL CAPTCHA
  const handleYesClick = () => {
    setStep(2);
  };

  // MENG-GENERATE ULANG SETIAP MODAL HAPUS AKUN DI KLIK
  useEffect(() => {
    generateCaptchaCode();
  }, [show]);

  // MEMBUAT KODE CAPTCHA
  const generateCaptchaCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaCode(code);
    setIsValid(false);
  };

  // MEMVALIDASI KODE CAPTCHA
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
    if (e.target.value === captchaCode) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  // MENGIRIM KODE CAPTCHA
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput || userInput.trim() === "") {
      showErrorToast("Silakan masukkan kode captcha!");
      return;
    } else if (!isValid) {
      showErrorToast("Kode captcha tidak sesuai!");
      return;
    }

    if (
      orders?.filter(
        (order) =>
          order.status === "in-progress" || order.status === "delivered"
      ).length > 0
    ) {
      showErrorToast("Anda masih memiliki pesanan yang belum selesai!");
      onClose();
      return;
    }

    const response = await deleteUser(currentUser?._id);
    if (response?.success) {
      showSuccessToast("Akun berhasil dihapus");
      navigate("/");
      onClose();
    } else {
      showErrorToast(response.response.data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative p-4 w-full max-w-xl transform transition-transform duration-300 ease-in-out ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="relative bg-white rounded-lg shadow overflow-x-hidden">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-3 end-2.5 z-50 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>

          <div
            className={`transition-transform duration-300 ease-in-out ${
              step === 1 ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {step === 1 && (
              <div className="p-4 md:p-5 flex justify-center flex-col items-center text-center">
                <iframe src="https://lottie.host/embed/43cf72cb-f4cc-4491-a218-05d127d73ce1/RhKDgbsfaS.json"></iframe>
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Apakah Anda yakin ingin menghapus akun?
                </h3>
                <div>
                  <button
                    onClick={onClose}
                    type="button"
                    className="py-2.5 px-5 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleYesClick}
                    type="button"
                    className="text-white ms-3 bg-[#FF0000] hover:bg-red-600 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center cursor-pointer"
                  >
                    Ya
                  </button>
                </div>
              </div>
            )}
          </div>
          <div
            className={`transition-transform duration-300 ease-in-out ${
              step === 2 ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {step === 2 && (
              <div className="p-4 md:p-5 flex justify-center flex-col items-center text-center">
                <h2 className="text-lg font-medium mb-4">
                  Masukkan Kode Captcha
                </h2>
                <div className="flex justify-center items-start mb-4">
                  <div
                    style={{
                      backgroundImage: `url(${captcha})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="py-3 px-4"
                  >
                    <div className="relative select-none">
                      {captchaCode.split("").map((char, index) => (
                        <span
                          key={index}
                          className={`${
                            index % 2 === 0 ? "top-0" : "top-2"
                          } text-2xl font-bold relative`}
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="ml-4 text-sm font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
                    onClick={generateCaptchaCode}
                  >
                    <IoMdRefresh className="text-xl" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="w-full">
                  <div
                    className={`flex items-center p-2 rounded-xl border border-black focus-within:shadow-lg w-10/12 mx-auto
                    ${
                      userInput && isValid
                        ? "focus-within:border-[#28A745] border-[#8A8A8A]"
                        : ""
                    }
                    ${
                      userInput && !isValid
                        ? "focus-within:border-[#FF0000] border-[#8A8A8A]"
                        : ""
                    }`}
                  >
                    <input
                      className="flex-grow bg-transparent border-none focus:outline-none text-sm"
                      type="text"
                      value={userInput}
                      onChange={handleUserInput}
                      placeholder="Masukkan Kode Captcha"
                    />
                  </div>
                  {userInput && !isValid && (
                    <p className="text-[#FF0000] mt-2">Captcha tidak sesuai!</p>
                  )}
                  {userInput && isValid && (
                    <p className="text-[#28A745] mt-2">Captcha sudah sesuai!</p>
                  )}
                  <button
                    type="submit"
                    disabled={!isValid || !userInput}
                    className="w-full p-2 bg-[#FF0000] hover:bg-red-600 text-white font-medium rounded-lg mt-4 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400"
                  >
                    {isLoading ? "Menghapus..." : "Hapus Akun"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
