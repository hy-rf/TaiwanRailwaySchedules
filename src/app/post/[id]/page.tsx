import axios from "axios";
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
  const post = await axios(
    `https://self-pace-backend-dot-phrasal-clover-408902.de.r.appspot.com/post/${[
      params.id,
    ]}`
  );
  let title = post.data.payload.title;
  let content = post.data.payload.content;
  return {
    title: title,
    description: content,
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
