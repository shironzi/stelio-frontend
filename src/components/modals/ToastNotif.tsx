import "@/styles/components/toastNotif.css";
import { useEffect, useState } from "react";

interface Props {
  message: string;
  onClose: () => void;
}

const ToastNotif = ({ message, onClose }: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`toastNotif-container ${isClosing ? "toastNotif-exit" : ""}`}
    >
      <h4>{message}</h4>
    </div>
  );
};

export default ToastNotif;
