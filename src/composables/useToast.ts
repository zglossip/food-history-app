import { reactive, readonly } from "vue";

type ToastColor = "primary" | "success" | "warning" | "danger" | string;

const toastState = reactive({
  isOpen: false,
  message: "",
  color: "danger" as ToastColor,
});

const showToast = (message: string, color: ToastColor = "danger") => {
  toastState.message = message;
  toastState.color = color;
  toastState.isOpen = true;
};

const dismissToast = () => {
  toastState.isOpen = false;
};

export const useToast = () => ({
  toastState: readonly(toastState),
  showToast,
  dismissToast,
});
