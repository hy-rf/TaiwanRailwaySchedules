import { getDictionary } from "../dictionaries";
import StoredStations from "./_components/StoredStations";

export default async function Page({ params }: any) {
  const dict = await getDictionary(params.lang);
  return (
    <>
      <StoredStations title={dict.main.rail.station.storedstations} />
    </>
  );
}
