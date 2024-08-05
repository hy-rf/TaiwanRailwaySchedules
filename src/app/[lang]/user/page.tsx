import axios from "axios";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getDictionary } from "../dictionaries";
type Props = {
  lang: string;
};
export async function generateMetadata(): Promise<Metadata> {
  // TODO:get some user data from back end
  return {
    title: "User",
    description: "User",
  };
}
async function getMe() {
  try {
    return await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
        headers: {
          Authorization: cookies().get("token")?.value || "",
        },
      })
      .then((res) => res.data);
  } catch {
    return "";
  }
}
export default async function User({ params }: { params: Props }) {
  const dict = await getDictionary(params.lang);
  const userData = await getMe();
  const created = new Date(Date.parse(userData.created));
  const lastlogin = new Date(Date.parse(userData.lastlogin));
  if (userData === "") {
    return (
      <>
        <p>fail to get user data</p>
      </>
    );
  }
  return (
    <>
      <p>
        {dict.main.user.created}{" "}
        {created.toLocaleString("en-US", {
          timeZone: "Asia/Taipei",
          hourCycle: "h23",
        })}
      </p>
      <p>
        {dict.main.user.lastin}{" "}
        {lastlogin.toLocaleString("en-US", {
          timeZone: "Asia/Taipei",
          hourCycle: "h23",
        })}
      </p>
    </>
  );
}
