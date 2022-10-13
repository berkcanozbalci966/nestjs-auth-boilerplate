import { toast } from "react-toastify";

type toastType = "info" | "success" | "warn" | "error";

export default (type: toastType, message: string) => {
  const payload = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  return toast[type](message, payload as any);
};
