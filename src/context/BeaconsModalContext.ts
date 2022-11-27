import type { Dispatch, SetStateAction } from "react";
import React from "react";
interface ModalInterface {
  showBeaconsModal: boolean;
  setShowBeaconsModal: Dispatch<SetStateAction<boolean>>;
}
export const BeaconsModalContext = React.createContext<ModalInterface | null>(
  null
);
