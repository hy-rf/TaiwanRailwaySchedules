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
  // TODO: fetch from backend
  return {
    title: "home page",
    description: "test home page description",
  };
}
export default function Home() {
  return (
    <>
      <h3 className="text-3xl font-bold underline">home</h3>
    </>
  );
}
