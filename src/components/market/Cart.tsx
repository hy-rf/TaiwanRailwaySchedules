"use client";
import type typeCart from "@/type/Cart";
import { useEffect, useState } from "react";
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
  const defaultCart: typeCart = {
    uuid: 1,
    content: [],
  };
  const [cart, setCart] = useState(defaultCart);
  useEffect(() => {
    setCart(getCart());
  }, []);
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
