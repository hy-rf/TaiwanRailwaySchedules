import { NextResponse, NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest, locales: Array<string>) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });
  let languages =
    new Negotiator({ headers: negotiatorHeaders }).languages() ?? [];
  let defaultLocale = "en-US";

  return matchLocale(languages, locales, defaultLocale);
}

export async function middleware(request: NextRequest, response: NextResponse) {
  const dict = await import("@/dictionaries/en-US.json").then(
    (mod) => mod.default
  );
  const localizationStringKeys = Object.getOwnPropertyNames(dict);
  console.log(localizationStringKeys);

  const currentLocal = request.cookies.get("locale")?.value;
  console.log(currentLocal);

  const { pathname } = request.nextUrl;
  if (
    [
      "/favicon.ico",
      "/logo.webp",
      "/googlec943e120b8428ef8.html",
      "/sitemap.xml",
    ].includes(pathname)
  ) {
    return;
  }
  const locales = ["en-US", "zh-TW", "zh-CN"];
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  if (currentLocal !== undefined) {
    request.nextUrl.pathname = `/${currentLocal}${pathname}`;
    return NextResponse.redirect(request.nextUrl, {
      headers: {
        "Set-Cookie": `locale=${currentLocal}`,
      },
    });
  } else {
    const locale = getLocale(request, locales);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl, {
      headers: {
        "Set-Cookie": `locale=${locale}`,
      },
    });
  }

  // e.g. incoming request is /products
  // The new URL is now /en-US/products
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};

// async function getLocales() {
//   const files = await readdir(join(__dirname, "./dictionaries"));
//   console.log(files);
// }
