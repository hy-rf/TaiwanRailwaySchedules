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
  const post = await getPostById(parseInt(params.id));
  let title = `id: ${post.data.payload.id} and title: ${post.data.payload.title}`;
  let content = post.data.payload.content;
  return {
    title: title,
    description: content,
  };
}
async function getPostById(id: number) {
  return await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${id}`);
}
export default async function Post({ params }: any) {
  const post = (await getPostById(parseInt(params.id))).data.payload;
  return (
    <>
      <a href="/post">go back to post list</a>
      <h5 className="text-3x1 font-bold underline">
        server generated id: {params.id}
      </h5>
      <h5 className="text-3 font-bold underline">
        server generated title: {post.title}
      </h5>
      <p>server generated content: {post.content}</p>
    </>
  );
}
