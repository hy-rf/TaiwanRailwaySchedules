import dynamic from "next/dynamic";
import { getDictionary } from "../dictionaries";
const StoredStations = dynamic(() => import("./_components/StoredStations"), {
  loading: () => <p>Loading...</p>,
});

export default async function Page({ params }: any) {
  const dict = await getDictionary(params.lang);
  return (
    <>
      <StoredStations title={dict.main.rail.station.storedstations} />
    </>
  );
}
