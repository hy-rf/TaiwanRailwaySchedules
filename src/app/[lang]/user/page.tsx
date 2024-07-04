import axios from "axios";
import type { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
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
    title: "User",
    description: "User",
  };
}
async function getMe() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
    headers: {
      Authorization: cookies().get("token")?.value || "",
    },
  });
  console.log(res);
}
export default function User() {
  getMe();
  return (
    <>
      <h3 className="text-3xl font-bold underline">User</h3>
    </>
  );
}
