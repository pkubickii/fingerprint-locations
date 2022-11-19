import { signIn, signOut, useSession } from "next-auth/react";
import FormFingerPrint from "../components/FormFingerPrint";

const AuthWrapper: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <>
          <p className="text-2xl text-sky-400">
            Logged in as {sessionData?.user?.name}
          </p>
          <div>
            <FormFingerPrint />
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
export default AuthWrapper;
