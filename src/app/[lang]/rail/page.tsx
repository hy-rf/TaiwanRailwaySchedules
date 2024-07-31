import StoredStations from "./_components/StoredStations";

// import LineInfoClient from "@/components/rail/LineInfoClient";
export const revalidate = 0;
export default function Page() {
  return (
    <>
      <StoredStations />
    </>
  );
}
