import { useSession } from "next-auth/react";
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
    </div>
  );
};
export default AuthWrapper;
