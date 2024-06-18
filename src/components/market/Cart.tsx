"use client";
import type typeCart from "@/type/Cart";
import { useState } from "react";
function getCart(): typeCart {
  const cart = JSON.parse(
    localStorage.getItem("cart") ||
      JSON.stringify({
        uuid: 1,
        content: [],
      })
  );
  return cart;
}
export default function Cart() {
  const [cart, setCart] = useState(getCart());
  return (
    <>
      {cart.content.map((ele, index) => {
        return (
          <div key={ele.id}>
            <p>{ele.price}</p>
            <p>{ele.number}</p>
            <button>+</button>
            <button>-</button>
            <button>x</button>
          </div>
        );
      })}
      <p>total: </p>
    </>
  );
}
