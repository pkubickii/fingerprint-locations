import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <nav className="flex flex-wrap items-center justify-between bg-gradient-to-tl from-inherit to-inherit p-3 sm:p-6">
      <div className="mr-6 mb-4 flex flex-shrink-0 items-center text-white">
        <Image
          src="/fingerprint2.svg"
          width={80}
          height={100}
          alt="fingerprint logo"
        />
        <span className="ml-10 hidden rounded-2xl p-2 text-3xl font-bold tracking-widest text-slate-300 shadow-lg shadow-slate-200 min-[390px]:inline-block">
          <em>Fingerprint</em>
        </span>
      </div>
      <div className="flex flex-grow flex-row items-center justify-center md:flex-none">
        <button
          className="h-10 w-28 rounded-md border-2 border-black bg-inherit from-sky-100 to-sky-500 px-2 py-1 text-xl shadow-lg hover:bg-gradient-to-br md:h-16 md:w-auto md:px-6 md:py-2"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </nav>
  );
};
export default Header;
