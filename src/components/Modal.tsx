import type { MouseEvent } from "react";
import React from "react";

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === "wrapper") onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-sky-300 bg-opacity-25 backdrop-blur-sm"
        id="wrapper"
        onClick={handleClose}
      >
        <div className="flex w-auto flex-col">
          <button
            className="place-self-end text-2xl text-rose-600"
            onClick={() => onClose()}
          >
            X
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-xl bg-sky-300 p-2"
          >
            <div className="flex items-center justify-center p-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
