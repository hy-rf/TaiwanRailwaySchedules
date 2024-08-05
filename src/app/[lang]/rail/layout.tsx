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
    <div className="flex">
      <div>{children}</div>
    </div>
  );
}
