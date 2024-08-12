import "./globals.css";
import NavOpt from "./_components/NavOption";
import { cookies } from "next/headers";
import { getDictionary } from "./dictionaries";
import NextTopLoader from "nextjs-toploader";
import LoginPanel from "./user/_components/LoginPanel";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./global-error";
import { Toaster } from "react-hot-toast";

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
        <meta
          name="google-site-verification"
          content="xBsRsq-Jwga4v_OfE5eIF7nArfDR61qh89787A18crM"
        />
      </head>
      <body>
        <NextTopLoader />
        <nav className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <a href="/rail" className="flex items-center">
                <img
                  src="/logo.webp"
                  width="40"
                  height="40"
                  className="mr-2"
                  alt="Logo"
                />
                <span className="text-xl font-semibold">Taiwan Rail</span>
              </a>
              <ul className="flex space-x-4">
                <NavOpt href="/rail" text={dict.nav.rail} />
                <NavOpt
                  href="/rail/station"
                  text={dict.main.rail.nav.stationtitle}
                />
                <NavOpt
                  href="/rail/line"
                  text={dict.main.rail.nav.linetitle}
                />
              </ul>
            </div>
          </div>
        </nav>
        <ErrorBoundary errorComponent={Error}>
          <main className="container mx-auto px-4 py-8">{children}</main>
        </ErrorBoundary>
        <Toaster position="top-right" />
        {/* <LoginPanel /> */}
      </body>
    </html>
  );
}
