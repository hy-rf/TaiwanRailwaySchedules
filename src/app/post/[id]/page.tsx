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
    title: params.id,
  };
}
export default function Post({ params }: any) {
  return (
    <>
      <a href="/post">go to post</a>
      <h3 className="text-3xl font-bold underline">
        this is post with id: {params.id}
      </h3>
    </>
  );
}
