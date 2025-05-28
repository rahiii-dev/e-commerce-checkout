import { createPortal } from "react-dom";
import Text from "../atoms/Text";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background rounded-2xl shadow-xl w-max p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white"
        >
          ✕
        </button>

        {/* Title */}
        {title && <Text as="h2" className="text-xl font-semibold mb-4">{title}</Text>}

        {/* Content */}
        <div className="mt-3">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
