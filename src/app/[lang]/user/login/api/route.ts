import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const google_login_access_token: string | null =
    req.headers.get("Authorization");

  const resp = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
    method: "post",
    headers: {
      Authorization: google_login_access_token,
    },
  });
  const cookieStore = cookies();
  cookieStore.set("token", resp.data.token);
  return Response.json({
    message: "success",
  });
}
