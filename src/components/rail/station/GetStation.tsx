"use client";
import { useState } from "react";
export default function GetStation({ city }: { city: string }) {
  const [InputCity, setInputCity] = useState(city);
  return (
    <>
      <p>輸入城市：</p>
      <input
        type="text"
        value={InputCity}
        onChange={(e) => setInputCity(e.target.value)}
        style={{
          border: "1px grey solid",
          margin: "5px",
        }}
      />
      <button
        onClick={(e) => {
          document.location.href = `/rail/station?city=${InputCity}`;
        }}
      >
        go
      </button>
      <hr />
    </>
  );
}
