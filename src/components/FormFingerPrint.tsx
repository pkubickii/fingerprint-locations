import { trpc } from "../utils/trpc";
import { useState } from "react";

const FormFingerPrint: React.FC = () => {
  const [room, setRoom] = useState("");
  const [coord, setCoord] = useState("");
  const [signal, setSignal] = useState("");

  const utils = trpc.useContext();
  const postFingerprint = trpc.fingerprint.postFingerprint.useMutation({
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

  return (
    <form
      className="mb-5 mt-5 flex flex-col gap-3 lg:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        postFingerprint.mutate({
          room,
          coord,
          signal,
        });
        setRoom("");
        setCoord("");
        setSignal("");
      }}
    >
      <input
        type="text"
        value={room}
        placeholder="Numer pokoju"
        minLength={2}
        maxLength={100}
        onChange={(event) => setRoom(event.target.value)}
        className="rounded-md border-2 border-zinc-800 bg-sky-100 px-4 py-2 focus:outline-none"
      />
      <input
        type="text"
        value={coord}
        placeholder="Koordynaty"
        minLength={2}
        maxLength={100}
        onChange={(event) => setCoord(event.target.value)}
        className="rounded-md border-2 border-zinc-800 bg-sky-100 px-4 py-2  focus:outline-none"
      />
      <input
        type="text"
        value={signal}
        placeholder="Siła sygnału"
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
export default FormFingerPrint;
