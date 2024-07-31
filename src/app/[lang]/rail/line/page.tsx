import LineInfoClient from "@/components/rail/line/LineInfoClient";
export const revalidate = 0;
export default function Page() {
  return (
    <div className="p-1">
      <LineInfoClient />
    </div>
  );
}
