import { toast } from "react-toastify";

const toastOptions = {};

export const showToast = (toastType, message) => {
  if (toast[toastType]) {
    toast[toastType](message, toastOptions);
  } else {
    toast(message, toastOptions);
  }
};
