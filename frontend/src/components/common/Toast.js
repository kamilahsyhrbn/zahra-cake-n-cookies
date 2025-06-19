import toast from "react-hot-toast";

const showSuccessToast = (message) => {
  return toast(message, {
    duration: 3000,
    style: {
      background: "#28A745",
      color: "#FFFFFF",
      textAlign: "center",
      width: "full",
      borderRadius: "12px",
      fontSize: "14px",
      textAlign: "center",
      padding: "10px 20px",
      width: "full",
      maxWidth: "900px",
    },
  });
};

const showErrorToast = (message) => {
  return toast(message, {
    duration: 3000,
    style: {
      background: "#FF0000",
      color: "#FFFFFF",
      borderRadius: "12px",
      fontSize: "14px",
      textAlign: "center",
      padding: "10px 20px",
      width: "full",
      maxWidth: "900px",
    },
  });
};

const showLoadingToast = ({ message }) => {
  return toast.loading(message, {
    duration: 3000,
    style: {
      background: "#ffffff",
      color: "#000000",
      textAlign: "center",
      width: "full",
      borderRadius: "12px",
      fontSize: "14px",
      textAlign: "center",
      padding: "10px 20px",
      width: "full",
      maxWidth: "900px",
    },
  });
};

export { showSuccessToast, showErrorToast, showLoadingToast };
