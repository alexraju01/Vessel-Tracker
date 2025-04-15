// src/utils/toastUtils.js
import { useToast } from "vue-toastification";

const toast = useToast();

export const showErrorToast = (message) => {
  toast.error(message, {
    closeOnClick: true,
    pauseOnHover: true,
    position: "bottom-right",
    toastClassName: "custom-toast-error",
    bodyClassName: "custom-toast-body",
  });
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    closeOnClick: true,
    pauseOnHover: true,
    position: "bottom-right",
    toastClassName: "custom-toast-success",
    bodyClassName: "custom-toast-body",
  });
};

export const showWarningToast = (message) => {
  toast.warning(message, {
    closeOnClick: true,
    pauseOnHover: true,
    position: "bottom-right",
    toastClassName: "custom-toast-warning",
    bodyClassName: "custom-toast-body",
  });
};
