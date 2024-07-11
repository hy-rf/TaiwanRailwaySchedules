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
  try{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
    headers: {
      Authorization: cookies().get("token")?.value || "",
    },
  });
  return res.data;
  }
  catch{
    return ""
  }
}
export default async function User() {
  const userData = await getMe();
  if(userData===""){
    return <><p>fail to get user data</p></>
  }
  return (
    <>
      <p>created: {userData.created}</p>
      <p>last time login: {userData.lastlogin}</p>
    </>
  );
}
