import { getDictionary } from "../dictionaries";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  const dict = await getDictionary(params.lang);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        className="p-1"
        style={{
          position: "static",
          left: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <a
          href="/rail/line"
          style={{
            color: "blue",
            textDecoration: "underline",
          }}
        >
          {dict.main.rail.nav.linetitle}
        </a>
        <a
          href="/rail/station"
          style={{
            color: "blue",
            textDecoration: "underline",
          }}
        >
          {dict.main.rail.nav.stationtitle}
        </a>
      </div>
      <div>{children}</div>
    </div>
  );
}
