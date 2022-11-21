import { trpc } from "../utils/trpc";
import { useContext, useState } from "react";
import { EditModalContext } from "../context/EditModalContext";

type FormUpdateProps = {
  id: string;
};
const FormUpdateFingerPrint: React.FC<FormUpdateProps> = ({ id }) => {
  const [room, setRoom] = useState("");
  const [coord, setCoord] = useState("");
  const [signal, setSignal] = useState("");
  const editModalContext = useContext(EditModalContext);
  const utils = trpc.useContext();
  const updateFingerprint = trpc.fingerprint.updateFingerprint.useMutation({
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

  const { data: fingerprint, isLoading } =
    trpc.fingerprint.getFingerprint.useQuery(
      {
        id: id,
      },
      {
        onError: (error) => {
          console.log(`Error fetching data: ${error}`);
        },
        onSuccess: (data) => {
          if (data) {
            setRoom(data.room);
            setCoord(data?.coord ?? "");
            setSignal(data?.signal ?? "");
          }
        },
      }
    );
  if (isLoading) {
    return <span>Loading modal...</span>;
  }

  if (!fingerprint) {
    console.error("data from useQuery is null!");
    editModalContext?.setShowEditModal(false);
    return null;
  }
  return (
    <form
      className="flex flex-col gap-2 p-4"
      onSubmit={(event) => {
        event.preventDefault();
        updateFingerprint.mutate({
          id: id,
          room: room,
          coord: coord,
          signal: signal,
        });
        editModalContext?.setShowEditModal(false);
      }}
    >
      <input
        type="text"
        value={room}
        minLength={2}
        maxLength={100}
        onChange={(event) => setRoom(event.target.value)}
        className="rounded-md border-2 border-zinc-800 bg-sky-100 px-4 py-2 focus:outline-none"
      />
      <input
        type="text"
        value={coord}
        minLength={2}
        maxLength={100}
        onChange={(event) => setCoord(event.target.value)}
        className="rounded-md border-2 border-zinc-800 bg-sky-100 px-4 py-2  focus:outline-none"
      />
      <input
        type="text"
        value={signal}
        minLength={2}
        maxLength={100}
        onChange={(event) => setSignal(event.target.value)}
        className="rounded-md border-2 border-zinc-800 bg-sky-100 px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-md border-2 border-zinc-800 from-sky-100 to-sky-500 p-2 hover:bg-gradient-to-br focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};
export default FormUpdateFingerPrint;
