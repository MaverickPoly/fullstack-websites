import React from "react";
import { useToast } from "../context/ToastContext";
import Toast from "./Toast";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="z-50 fixed top-4 left-4 flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
