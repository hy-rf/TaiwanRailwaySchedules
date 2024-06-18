import { useState } from "react";
import type Product from "@/type/Product";
type Cart = {
  uuid: number;
  content: Array<Product>;
};

function getCart(): Cart {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  return cart;
}

export default function Cart() {
  const [cart, setCart] = useState(getCart());
  return (
    <>
      <h3 className="text-3xl font-bold underline">Cart</h3>
      {cart.content.map((ele, index) => {
        return (
          <div key={ele.id}>
            <p>{ele.number}</p>
            <p>{ele.price}</p>
          </div>
        );
      })}
    </>
  );
}
