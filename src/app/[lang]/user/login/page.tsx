"use client";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
export default function Login() {
  return (
    <>
      <GoogleOAuthProvider clientId="496489862453-8ka1nrk1hi6m68vs37bl79utffnub1i7.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={async (tokenResponse) => {
            const res = await axios(`${process.env.BACKEND_URL}/login`, {
              method: "post",
              headers: {
                Authorization: tokenResponse.credential,
              },
              withCredentials: true,
            });
          }}
        ></GoogleLogin>
      </GoogleOAuthProvider>
    </>
  );
}
