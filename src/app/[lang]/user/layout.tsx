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
    <>
      <h3 className="text-3xl font-bold underline">User Layout</h3>
      {children}
    </>
  );
}
