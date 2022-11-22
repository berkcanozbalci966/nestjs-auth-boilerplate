import { toast } from "react-toastify";

type toastType = "info" | "success" | "warn" | "error";

export default (type: toastType, message: string) => {
  const payload = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    closeButton: false,
  };

  return toast[type](message, payload as any);
};

export const toastEmitterAsync = async (type: toastType, message: string) => {
  const payload = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    closeButton: false,
  };

  return toast[type](message, payload as any);
};
