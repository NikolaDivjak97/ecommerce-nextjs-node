import { toast } from "react-toastify";

export const showSuccessMessage = (message) => {
  toast.success(message, {
    position: "top-right",
  });
};

export const showErrorMessage = (message) => {
  toast.error(message, {
    position: "top-right",
  });
};
