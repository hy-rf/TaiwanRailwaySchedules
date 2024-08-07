export default function StationLink({
  stationName,
  stationId,
}: {
  stationName: string;
  stationId: string;
}) {
  return (
    <a className="text-blue-500 underline" href={`/rail/station/${stationId}`}>
      {stationName}
    </a>
  );
}
