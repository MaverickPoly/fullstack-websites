import { useToast } from "../contexts/ToastContext"
import ToastBox from "./ToastBox";

const ToastsContainer = () => {
    const toastContext = useToast();

  return (
    <div className="fixed top-3 left-3 flex flex-col gap-3">
        {toastContext.toasts.map((toast) => (
            <ToastBox key={toast.id} toast={toast} />
        ))}
    </div>
  )
}

export default ToastsContainer