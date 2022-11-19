import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { EditIdContext } from "../context/EditIdContext";
import { ModalContext } from "../context/ModalContext";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState("");
  return (
    <SessionProvider session={session}>
      <ModalContext.Provider value={{ showModal, setShowModal }}>
        <EditIdContext.Provider value={{ editId, setEditId }}>
          <Component {...pageProps} />
        </EditIdContext.Provider>
      </ModalContext.Provider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
