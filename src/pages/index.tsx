import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { EditIdContext } from "../context/EditIdContext";
import { ModalContext } from "../context/ModalContext";
import EditModal from "../components/EditModal";
import AuthWrapper from "../components/AuthWrapper";
import FingerLocations from "../components/FingerLocations";
import FormUpdateFingerPrint from "../components/FormUpdateFingerPrint";

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState("");

  return (
    <>
      <Head>
        <title>Fingerprint locations</title>
        <meta name="description" content="fingerprint locations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ModalContext.Provider value={{ showModal, setShowModal }}>
        <EditIdContext.Provider value={{ editId, setEditId }}>
          <main className="justify-top-5 container mx-auto flex min-h-screen flex-col items-center p-4">
            <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
              Fingerprint <span className="text-sky-400">locations</span>
            </h1>
            <div>
              <FingerLocations />
            </div>
            <div className="mt-8">
              <AuthWrapper />
            </div>
            <button
              className="mt-5 rounded-md border-2 border-zinc-800 from-sky-100 to-sky-500 p-2 hover:bg-gradient-to-br focus:outline-none"
              onClick={() => setShowModal(true)}
            >
              Modal
            </button>
            <div>
              <EditModal
                isVisible={showModal}
                onClose={() => setShowModal(false)}
              >
                <FormUpdateFingerPrint id={editId} />
              </EditModal>
            </div>
          </main>
        </EditIdContext.Provider>
      </ModalContext.Provider>
    </>
  );
};

export default Home;
