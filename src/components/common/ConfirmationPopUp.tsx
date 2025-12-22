import "@/styles/components/confirmationPopUp.css";

interface ConfirmationPopUpProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationPopUp({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ConfirmationPopUpProps) {
  if (!isOpen) return null;

  return (
    <div className="confirmationPopUp-container">
      <div className="confirmationPopUp-popup">
        <p>{message}</p>

        <div className="confirmationPopUp-actions">
          <button className="btn-success" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
