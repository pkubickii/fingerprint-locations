import React, { Dispatch, SetStateAction } from "react";
interface EditIdInterface {
  editId: string;
  setEditId: Dispatch<SetStateAction<string>>;
}
export const EditIdContext = React.createContext<EditIdInterface | null>(null);
