import toast from "react-hot-toast";


const notify = (
  message: string,
  type: "default" | "error" | "success" = "default"
) => {
  const toastType = {
    default: toast(message),
    success: toast.success(message),
    error: toast.error(message),
  };
  toastType[type];
};

export default notify;
