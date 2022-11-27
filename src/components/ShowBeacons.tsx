import { trpc } from "../utils/trpc";
import { useContext, useState } from "react";
import { BeaconsModalContext } from "../context/BeaconsModalContext";

type ShowBeaconsProps = {
  id: string;
};
const ShowBeacons: React.FC<ShowBeaconsProps> = ({ id }) => {
  const beaconsModalContext = useContext(BeaconsModalContext);
  const { data: fingerprint, isLoading } =
    trpc.fingerprint.getFingerprint.useQuery(
      {
        id: id,
      },
      {
        onError: (error) => {
          console.log(`Error fetching data: ${error}`);
        },
      }
    );
  if (isLoading) {
    return <span>Loading modal...</span>;
  }

  if (!fingerprint) {
    console.error("data from useQuery is null!");
    beaconsModalContext?.setShowBeaconsModal(false);
    return null;
  }
  return (
    <table className="border-collapse border-2 border-slate-500 bg-sky-200 text-slate-800 shadow-2xl">
      <thead>
        <tr>
          <th className="border-2 border-slate-600 px-4 py-2">Beacon name:</th>
          <th className="border-2 border-slate-600 px-4 py-2">Beacon power:</th>
        </tr>
      </thead>
      <tbody>
        {fingerprint.beacons?.map((beacon, index) => {
          return (
            <tr key={index}>
              <td className="border-2 border-slate-700 from-sky-50 to-sky-500 px-4 py-2 shadow-sky-900 hover:bg-gradient-to-br hover:shadow-xl">
                {beacon.name}
              </td>
              <td className="border-2 border-slate-700 from-rose-100 to-rose-500 px-4 py-2 shadow-rose-900 hover:bg-gradient-to-br hover:shadow-xl">
                {beacon.power}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default ShowBeacons;
