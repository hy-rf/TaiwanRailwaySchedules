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
    title: "User",
    description: "User",
  };
}
export default function User() {
  return (
    <>
      <h3 className="text-3xl font-bold underline">User</h3>
    </>
  );
}
