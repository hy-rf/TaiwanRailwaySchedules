"use client";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
export default function LoginPanel() {
  const [isLogin, setIsLogin] = useState(() => {
    if (typeof window !== "undefined") {
      return new RegExp("token").test(window.document.cookie);
    }
  });
  return (
    <div className="fixed top-1 right-10">
      {isLogin && <p>login</p>}
      {!isLogin && (
        <GoogleOAuthProvider clientId="">
          <GoogleLogin
            onSuccess={async (tokenResponse) => {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_FRONTEND_URL}/user/login/api`,
                {
                  method: "get",
                  headers: {
                    Authorization: tokenResponse.credential || "",
                  },
                  credentials: "include",
                }
              );
            }}
          ></GoogleLogin>
        </GoogleOAuthProvider>
      )}
    </div>
  );
}
