export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
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
          line
        </a>
        <a
          href="/rail/station"
          style={{
            color: "blue",
            textDecoration: "underline",
          }}
        >
          station
        </a>
      </div>
      <div>{children}</div>
    </div>
  );
}
