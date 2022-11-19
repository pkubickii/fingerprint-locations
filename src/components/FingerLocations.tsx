import { trpc } from "../utils/trpc";
import { useContext } from "react";
import { EditIdContext } from "../context/EditIdContext";
import { ModalContext } from "../context/ModalContext";

const FingerLocations: React.FC = () => {
  const editContext = useContext(EditIdContext);
  const modalContext = useContext(ModalContext);
  const handleEdit = (id: string) => {
    editContext?.setEditId(id);
    modalContext?.setShowModal(true);
  };
  const { data: fingerprints, isLoading } =
    trpc.fingerprint.getAllFingerprints.useQuery();

  const utils = trpc.useContext();
  const deleteFingerprint = trpc.fingerprint.deleteFingerprint.useMutation({
    onMutate: () => {
      utils.fingerprint.getAllFingerprints.cancel();
      const optimisticUpdate = utils.fingerprint.getAllFingerprints.getData();

      if (optimisticUpdate) {
        utils.fingerprint.getAllFingerprints.setData(optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.fingerprint.getAllFingerprints.invalidate();
    },
  });

  if (isLoading) return <div>Pobieram fingerprinty ...</div>;

  return (
    <div className="m-10 flex flex-row gap-4">
      {fingerprints?.map((fingerprint, index) => {
        return (
          <section
            className="flex flex-col justify-center rounded border-2 border-gray-500 from-sky-100 to-sky-500 p-6 shadow-xl duration-500 hover:bg-gradient-to-br motion-safe:hover:scale-105"
            key={index}
          >
            <p>{fingerprint.room}</p>
            <p>Koordynaty: {fingerprint.coord}</p>
            <p>Siła sygnału: {fingerprint.signal}</p>
            <button
              onClick={() => deleteFingerprint.mutate({ id: fingerprint.id })}
            >
              Delete
            </button>
            <button onClick={() => handleEdit(fingerprint.id)}>Edit</button>
          </section>
        );
      })}
    </div>
  );
};
export default FingerLocations;
