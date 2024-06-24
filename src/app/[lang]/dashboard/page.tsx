import type { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: {
    id: string;
  };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Dashboard",
    description: "Dashboard",
  };
}
export default function Index() {
  return (
    <>
      <h3 className="text-3xl font-bold underline">Dashboard</h3>
    </>
  );
}
