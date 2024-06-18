"use client";
import type Cart from "@/type/Cart";
import type typeProduct from "@/type/Product";
function addProductToCart(newProduct: typeProduct): void {
  const cart: Cart = JSON.parse(
    localStorage.getItem("cart") ||
      JSON.stringify({
        uuid: 1,
        content: [],
      })
  );
  cart.content.push(newProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
}
export default function AddToCart({ id }: any) {
  return (
    <button
      onClick={() => {
        addProductToCart({
          id: parseInt(id),
          number: 1,
          price: 15,
        });
      }}
    >
      Add to cart
    </button>
  );
}
