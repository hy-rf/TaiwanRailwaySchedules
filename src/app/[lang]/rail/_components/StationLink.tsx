export default function StationLink({
  stationName,
  stationId,
}: {
  stationName: string;
  stationId: string;
}) {
  return (
    <a
      style={{
        color: "blue",
        textDecoration: "underline",
      }}
      href={`/rail/station/${stationId}`}
    >
      {stationName}
    </a>
  );
}
