import { type NextPage } from "next";
import Head from "next/head";
import EditModal from "../components/EditModal";
import AuthWrapper from "../components/AuthWrapper";
import FingerLocations from "../components/FingerLocations";
import FormUpdateFingerPrint from "../components/FormUpdateFingerPrint";
import { ModalContext } from "../context/ModalContext";
import { EditIdContext } from "../context/EditIdContext";
import { useContext } from "react";

const Home: NextPage = () => {
  const modalContext = useContext(ModalContext);
  const editIdContext = useContext(EditIdContext);
  return (
    <>
      <Head>
        <title>Fingerprint locations</title>
        <meta name="description" content="fingerprint locations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
        <div>
          <EditModal
            isVisible={modalContext?.showModal ?? false}
            onClose={() => modalContext?.setShowModal(false)}
          >
            <FormUpdateFingerPrint id={editIdContext?.editId ?? ""} />
          </EditModal>
        </div>
      </main>
    </>
  );
};

export default Home;
