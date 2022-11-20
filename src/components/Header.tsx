import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <nav className="flex flex-wrap items-center justify-between bg-gradient-to-tl from-inherit to-inherit p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
        <Image
          src="/fingerprint2.svg"
          width={80}
          height={100}
          alt="fingerprint logo"
        />
        <span className="ml-10 rounded-2xl p-2 text-3xl font-bold tracking-widest text-slate-300 shadow-lg shadow-slate-200">
          <em>Fingerprint</em>
        </span>
      </div>
      <button
        className="h-14 rounded-md border border-black bg-inherit from-sky-100 to-sky-500 px-4 py-2 text-xl shadow-lg hover:bg-gradient-to-br"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </nav>
  );
};
export default Header;
