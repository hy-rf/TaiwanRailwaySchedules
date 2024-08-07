export default function LineLink({ lineId }: { lineId: string }) {
  return (
    <a className="text-blue-500 underline" href={`/rail/line/${lineId}`}>
      {lineId}
    </a>
  );
}
