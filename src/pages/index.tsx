import { type NextPage } from "next";
import Head from "next/head";
import Modal from "../components/Modal";
import AuthWrapper from "../components/AuthWrapper";
import FingerLocations from "../components/FingerLocations";
import FormUpdateFingerPrint from "../components/FormUpdateFingerPrint";
import { EditModalContext } from "../context/EditModalContext";
import { EditIdContext } from "../context/EditIdContext";
import { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BeaconsModalContext } from "../context/BeaconsModalContext";
import ShowBeacons from "../components/ShowBeacons";

const Home: NextPage = () => {
  const editModalContext = useContext(EditModalContext);
  const beaconsModalContext = useContext(BeaconsModalContext);
  const editIdContext = useContext(EditIdContext);
  return (
    <>
      <Head>
        <title>Fingerprint locations</title>
        <meta name="description" content="fingerprint locations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="justify-top-5 container mx-auto flex min-h-screen flex-col items-center p-3 min-[390px]:p-4">
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
          <Modal
            isVisible={editModalContext?.showEditModal ?? false}
            onClose={() => editModalContext?.setShowEditModal(false)}
          >
            <FormUpdateFingerPrint id={editIdContext?.editId ?? ""} />
          </Modal>
        </div>
        <div>
          <Modal
            isVisible={beaconsModalContext?.showBeaconsModal ?? false}
            onClose={() => beaconsModalContext?.setShowBeaconsModal(false)}
          >
            <ShowBeacons id={editIdContext?.editId ?? ""} />
          </Modal>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Home;
