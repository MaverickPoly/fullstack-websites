import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastTypes = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = ToastTypes.INFO, duration) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);

    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const successToast = (message, duration = 3000) => {
    addToast(message, ToastTypes.SUCCESS, duration);
  };
  const errorToast = (message, duration = 3000) => {
    addToast(message, ToastTypes.ERROR, duration);
  };
  const warningToast = (message, duration = 3000) => {
    addToast(message, ToastTypes.WARNING, duration);
  };
  const infoToast = (message, duration = 3000) => {
    addToast(message, ToastTypes.INFO, duration);
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        removeToast,
        successToast,
        errorToast,
        warningToast,
        infoToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be wrapped inside a ToastProvider!");
  }
  return context;
};
