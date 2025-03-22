import { createContext, ReactNode, useContext, useState } from "react";
import { ToastContextType, ToastType } from "../types";

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export enum ToastTypes {
  SUCCESS = "success",
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToast = ({ text, type }: { text: string; type: ToastTypes }) => {
    const id = Date.now();
    setToasts([...toasts, { text, type, id }]);

    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const toastSuccess = (text: string) => {
    showToast({ text, type: ToastTypes.SUCCESS });
  };

  const toastWarn = (text: string) => {
    showToast({ text, type: ToastTypes.WARN });
  };

  const toastError = (text: string) => {
    showToast({ text, type: ToastTypes.ERROR });
  };

  const toastInfo = (text: string) => {
    showToast({ text, type: ToastTypes.INFO });
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        removeToast,
        toastSuccess,
        toastWarn,
        toastError,
        toastInfo,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("You have to wrap your App with ToastProvider!");
  }
  return context;
};
