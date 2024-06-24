import Cart from "@/components/market/Cart";
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
    title: "SP/Market/Cart",
    description: "Your Cart",
  };
}
export default function CartPage() {
  return (
    <>
      <h3 className="text-3xl font-bold underline">Cart</h3>
      <Cart />
    </>
  );
}
