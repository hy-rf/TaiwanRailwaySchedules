"use client";
import { useParams } from "next/navigation";
export default function Post() {
  const params = useParams();
  return (
    <>
      <a href="/dashboard">go to dashboard</a>
      <h3 className="text-3xl font-bold underline">{params.id}</h3>
    </>
  );
}
