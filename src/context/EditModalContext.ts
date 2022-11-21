import type { Dispatch, SetStateAction } from "react";
import React from "react";
interface ModalInterface {
  showEditModal: boolean;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
}
export const EditModalContext = React.createContext<ModalInterface | null>(null);
