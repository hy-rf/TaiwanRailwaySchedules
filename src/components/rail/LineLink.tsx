export default function LineLink({ lineId }: { lineId: string }) {
  return (
    <a
      style={{
        color: "blue",
        textDecoration: "underline",
      }}
      href={`/rail/line/${lineId}`}
    >
      {lineId}
    </a>
  );
}
