import React, { Dispatch, SetStateAction } from "react";
interface ModalInterface {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}
export const ModalContext = React.createContext<ModalInterface | null>(null);
