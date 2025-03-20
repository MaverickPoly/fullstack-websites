import { ToastTypes, useToast } from "../contexts/ToastContext";
import { ToastType } from "../types";

const ToastBox = ({toast}: {toast: ToastType}) => {
  const toastContext = useToast();

  const getToastColor = () => {
    switch (toast.type) {
      case ToastTypes.SUCCESS:
        return "bg-green-600";
      case ToastTypes.WARN:
        return "bg-orange-600";
      case ToastTypes.ERROR:
        return "bg-red-600";
      case ToastTypes.INFO:
        return "bg-blue-600";
      default:
        return "bg-neutral-600";
    }
  };

  return (
    <div
      className={`${getToastColor()} w-96 rounded-md py-1 px-3 text-white flex items-center justify-between`}
    >
      <h3 className="font-semibold text-xl pl-3">{toast.text}</h3>
      <button className="cursor-pointer p-3 rounded-md" onClick={() => toastContext.removeToast(toast.id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          fill="white"
          viewBox="0 0 50 50"
        >
          <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
        </svg>
      </button>
    </div>
  );
};

export default ToastBox;
