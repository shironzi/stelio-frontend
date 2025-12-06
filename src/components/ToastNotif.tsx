import "@/styles/components/toastNotif.css";
import { useEffect } from "react";

interface Props {
  message: string;
  onClose: () => void;
}

const ToastNotif = ({ message, onClose }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toastNotif-container">
      <h4>{message}</h4>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ToastNotif;
