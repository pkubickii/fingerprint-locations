import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import {useState} from "react";

const Home: NextPage = () => {
  //const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Fingerprint locations</title>
        <meta name="description" content="fingerprint locations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-top-5 p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Fingerprint <span className="text-sky-400">locations</span>
        </h1>
        <div>
       <FingerLocations /> 
        </div>
        <div className="mt-8">
        <AuthShowcase />
        </div>
      </main>
    </>
  );
};

export default Home;

const FingerLocations = () => {
  const { data: fingerprints, isLoading } = trpc.fingerprint.getAllFingerprints.useQuery();

  if (isLoading) return <div>Pobieram fingerprinty ...</div>;

  return (
    <div className="flex flex-row m-10 gap-4">
      {fingerprints?.map((fingerprint, index) => {
        return (
          <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105 hover:bg-gradient-to-br from-sky-100 to-sky-500" key={index}>
            <p>{fingerprint.room}</p>
            <p>Koordynaty: {fingerprint.coord}</p>
            <p>Siła sygnału: {fingerprint.signal}</p>
          </section>
        );
      })}
    </div>
  );
};

const Form: React.FC = () => {
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
    className="flex gap-2"
    onSubmit={(event) => {
      event.preventDefault();
      postFingerprint.mutate({
        room,
        coord,
        signal
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
      className="px-4 py-2 rounded-md border-2 border-zinc-800 bg-sky-100 focus:outline-none"
    />
    <input
      type="text"
      value={coord}
      placeholder="Koordynaty"
      minLength={2}
      maxLength={100}
      onChange={(event) => setCoord(event.target.value)}
      className="px-4 py-2 rounded-md border-2 border-zinc-800 bg-sky-100  focus:outline-none"
    />
    <input
      type="text"
      value={signal}
      placeholder="Siła sygnału"
      minLength={2}
      maxLength={100}
      onChange={(event) => setSignal(event.target.value)}
      className="px-4 py-2 rounded-md border-2 border-zinc-800 bg-sky-100 focus:outline-none"
    />
    <button
      type="submit"
      className="p-2 rounded-md border-2 border-zinc-800 focus:outline-none hover:bg-gradient-to-br from-sky-100 to-sky-500"
    >
      Submit
    </button>
  </form>
);
};

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <>
          <p className="text-2xl text-sky-400">
            Logged in as {sessionData?.user?.name}
          </p>
          <div>
            <Form />
          </div>
        </>
      )}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  name,
  description,
  documentation,
}) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <Link
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </Link>
    </section>
  );
};
