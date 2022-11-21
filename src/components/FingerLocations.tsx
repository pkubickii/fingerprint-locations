import { trpc } from "../utils/trpc";
import { useContext } from "react";
import { EditIdContext } from "../context/EditIdContext";
import { EditModalContext } from "../context/EditModalContext";
import { useSession } from "next-auth/react";
import { FaSatelliteDish } from "react-icons/fa";

const FingerLocations: React.FC = () => {
  const { data: sessionData } = useSession();
  const editContext = useContext(EditIdContext);
  const editModalContext = useContext(EditModalContext);
  const handleEdit = (id: string): void => {
    editContext?.setEditId(id);
    editModalContext?.setShowEditModal(true);
  };
  function handleBeacons(id: string): void {
    editContext?.setEditId(id);
    editModalContext?.setShowEditModal(true);
  }
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
    <div className="cols-4 m-1 mt-10 grid grid-cols-1 gap-4 min-[390px]:m-10 min-[390px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {fingerprints?.map((fingerprint, index) => {
        return (
          <section
            className="flex flex-col justify-center rounded border-2 border-gray-500 from-sky-100 to-sky-500 p-6 shadow-xl duration-500 hover:bg-gradient-to-br motion-safe:hover:scale-105 xl:w-48"
            key={index}
          >
            <p>
              Nr pokoju: <br />
              {fingerprint.room}
            </p>
            <p>
              Koordynaty:
              <br /> {fingerprint.coord}
            </p>
            <p>
              Siła sygnału:
              <br /> {fingerprint.signal}
            </p>
            {sessionData && (
              <>
                <button
                  className="mt-5 rounded border-2 border-zinc-800 from-inherit to-inherit hover:border-green-400 hover:bg-gradient-to-br"
                  onClick={() => handleEdit(fingerprint.id)}
                >
                  Edit
                </button>
                <button
                  className="mt-5 mb-5 rounded border-2 border-zinc-800 from-inherit to-inherit hover:border-2 hover:border-red-700 hover:bg-gradient-to-br"
                  onClick={() =>
                    deleteFingerprint.mutate({ id: fingerprint.id })
                  }
                >
                  Delete
                </button>
                <div className="h-12 text-center">
                  <button
                    className="rounded-2xl border-sky-800 from-transparent to-inherit p-3 hover:border-2 hover:bg-gradient-to-br"
                    onClick={() => handleBeacons(fingerprint.id)}
                  >
                    <FaSatelliteDish />
                  </button>
                </div>
              </>
            )}
          </section>
        );
      })}
    </div>
  );
};
export default FingerLocations;
