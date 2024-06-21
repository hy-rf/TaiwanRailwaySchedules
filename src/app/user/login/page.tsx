"use client";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
let url =
  "https://self-pace-backend-dot-phrasal-clover-408902.de.r.appspot.com";
export default function Login() {
  return (
    <>
      <GoogleOAuthProvider clientId="496489862453-8ka1nrk1hi6m68vs37bl79utffnub1i7.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(tokenResponse) => {
            console.log(tokenResponse);
            axios(`${url}/login`, {
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
