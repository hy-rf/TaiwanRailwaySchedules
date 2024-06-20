"use client";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function Login() {
  return (
    <>
      <GoogleOAuthProvider clientId="496489862453-8ka1nrk1hi6m68vs37bl79utffnub1i7.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(tokenResponse) => {
            console.log(tokenResponse);
          }}
        ></GoogleLogin>
      </GoogleOAuthProvider>
    </>
  );
}
