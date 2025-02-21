import toast from "react-hot-toast";

const notify = (
  message: string,
  type: "default" | "error" | "success" = "default"
) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast(message);
      break;
  }
};

export default notify;
