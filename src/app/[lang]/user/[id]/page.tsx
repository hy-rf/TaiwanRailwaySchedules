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
    title: "user name" + params.id,
    description: "test user profile id : " + params.id,
  };
}
export default function UserProfile({ params }: any) {
  return (
    <>
      <p>user profile id:{params.id}</p>
    </>
  );
}
