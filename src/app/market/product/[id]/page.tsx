"use client";
import { useParams } from "next/navigation";
export default function Post() {
  const params = useParams();
  return (
    <>
      <a href="/market">go to market</a>
      <h3 className="text-3xl font-bold underline">
        this is product with id {params.id}
      </h3>
    </>
  );
}
