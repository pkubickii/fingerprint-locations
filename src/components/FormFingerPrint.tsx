import { trpc } from "../utils/trpc";
import { ChangeEvent, useState } from "react";

const FormFingerPrint: React.FC = () => {
  const [room, setRoom] = useState("");
  const [coord, setCoord] = useState("");
  const [beacons, setBeacons] = useState({ name: "", power: "" });

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

  function handleBeaconChange(event: ChangeEvent<HTMLInputElement>): void {
    setBeacons({
      ...beacons,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <form
      className="mb-5 mt-5 flex flex-col gap-3 xl:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        postFingerprint.mutate({
          room,
          coord,
          beacons,
        });
        setRoom("");
        setCoord("");
        setBeacons({ name: "", power: "" });
      }}
    >
      <input
        type="text"
        value={room}
        placeholder="Numer pokoju"
        minLength={1}
        maxLength={10}
        onChange={(event) => setRoom(event.target.value)}
        className="rounded-md border-2 border-zinc-800 bg-sky-100 px-4 py-2 focus:outline-none"
      />
      <input
        type="text"
        value={coord}
        placeholder="Koordynaty"
        minLength={3}
        maxLength={20}
        onChange={(event) => setCoord(event.target.value)}
        className="rounded-md border-2 border-zinc-800 bg-sky-100 px-4 py-2  focus:outline-none"
      />
      <input
        type="text"
        name="name"
        value={beacons.name}
        placeholder="Nazwa beacona"
        minLength={2}
        maxLength={20}
        onChange={(event) => handleBeaconChange(event)}
        className="rounded-md border-2 border-zinc-800 bg-sky-100 px-4 py-2 focus:outline-none"
      />
      <input
        type="text"
        name="power"
        value={beacons.power}
        placeholder="Siła sygnału"
        minLength={1}
        maxLength={5}
        onChange={(event) => handleBeaconChange(event)}
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
