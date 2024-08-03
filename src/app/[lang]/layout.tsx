import type { Metadata } from "next";
import "./globals.css";
import NavOpt from "@/components/NavOption";
import { cookies } from "next/headers";
import { getDictionary } from "./dictionaries";
import NextTopLoader from "nextjs-toploader";
import LoginPanel from "./user/_components/LoginPanel";

type Props = {
  params: {
    lang: string;
  };
};

const metadatas: any = {
  "en-US": {
    title: "Taiwan Rail Schedules",
    description: "Get Taiwan Rail Schedules",
  },
  "zh-TW": {
    title: "台灣鐵路時刻表",
    description: "取得最新台灣鐵路時刻表",
  },
  "zh-CN": {
    title: "台湾铁路时刻表",
    description: "取得最新台湾铁路时刻表",
  },
};

export async function generateMetadata({ params }: Props) {
  return metadatas[params.lang];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  const cookie = cookies();
  const dict = await getDictionary(params.lang);

  const loggedin: boolean = cookie.get("token") != undefined;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
        ></script> */}
      </head>
      <body>
        <NextTopLoader zIndex={1} speed={99} />
        <nav className="fixed bottom-0 w-dvw">
          <div className="bg-gray-500 flex items-center justify-between bottom-0">
            <a href="/rail">
              <img
                src="/logo.png"
                width="50"
                height="50"
                className="m-0 p-0 ml-2"
              ></img>
            </a>
            <ul className="font-medium flex p-1 mt-0 mr-10 border border-gray-100 rounded-lg bg-gray-50 rtl:space-x-reverse bg-gray-800 border-gray-700 mt-2 m-2">
              {/* <NavOpt
                href={loggedin ? "/user" : "/user/login"}
                text="User"
              ></NavOpt> */}
              <NavOpt href="/rail" text={dict.nav.rail}></NavOpt>
              <NavOpt
                href="/rail/station"
                text={dict.main.rail.nav.stationtitle}
              ></NavOpt>
              <NavOpt
                href="/rail/line"
                text={dict.main.rail.nav.linetitle}
              ></NavOpt>
              {/* <NavOpt href="/metro" text={dict.nav.metro}></NavOpt>
              <NavOpt href="/bus" text={dict.nav.bus}></NavOpt> */}
            </ul>
          </div>
        </nav>
        <main className="mt-3 ml-3 mr-3 mb-16">{children}</main>
        <LoginPanel />
      </body>
    </html>
  );
}
