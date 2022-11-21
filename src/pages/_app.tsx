import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { EditIdContext } from "../context/EditIdContext";
import { EditModalContext } from "../context/EditModalContext";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState("");
  return (
    <SessionProvider session={session}>
      <EditModalContext.Provider value={{ showEditModal, setShowEditModal }}>
        <EditIdContext.Provider value={{ editId, setEditId }}>
          <Component {...pageProps} />
        </EditIdContext.Provider>
      </EditModalContext.Provider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
