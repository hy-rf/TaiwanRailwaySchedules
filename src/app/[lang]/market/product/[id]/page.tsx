import AddToCart from "@/components/market/AddToCart";
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

export default function Product({ params }: any) {
  return (
    <>
      <a href="/market">go to market</a>
      <h3 className="text-3xl font-bold underline">id {params.id}</h3>
      <AddToCart id={params.id}></AddToCart>
    </>
  );
}