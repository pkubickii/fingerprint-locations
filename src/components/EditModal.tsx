import type { MouseEvent } from "react";
import React from "react";

type EditModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const EditModal: React.FC<EditModalProps> = ({
  isVisible,
  onClose,
  children,
}) => {
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
        <div className="flex w-[600px] flex-col">
          <button
            className="place-self-end text-2xl text-white"
            onClick={() => onClose()}
          >
            X
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-xl bg-white p-2"
          >
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditModal;
