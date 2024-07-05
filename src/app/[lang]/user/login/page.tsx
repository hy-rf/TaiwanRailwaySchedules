"use client";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import axios from "axios";
export default function Login({ params }: any) {
  return (
    <>
      {params.lang == "en-US" && <h3>Other Login Methods</h3>}
      {params.lang == "zh-TW" && <h3>其他登入方式</h3>}
      {params.lang == "zh-CN" && <h3>第三方登入</h3>}
      <GoogleOAuthProvider clientId="496489862453-8ka1nrk1hi6m68vs37bl79utffnub1i7.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={async (tokenResponse) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
              {
                method: "post",
                headers: {
                  Authorization: tokenResponse.credential || "",
                },
                credentials: "include",
              }
            );
          }}
        ></GoogleLogin>
      </GoogleOAuthProvider>
    </>
  );
}
