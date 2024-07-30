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
      <div className="p-1 static bg-slate-200">
        <ul className="font-medium">
          <li>
            <a
              href="/rail/line"
              className="antialiased block py-2 px-3 text-gray-800 rounded bg-slate-100 aria-checked:bg-sky-700"
            >
              {dict.main.rail.nav.linetitle}
            </a>
          </li>
          <li>
            <a
              href="/rail/station"
              className="antialiased block py-2 px-3 text-gray-800 rounded bg-slate-100 aria-checked:bg-sky-700"
            >
              {dict.main.rail.nav.stationtitle}
            </a>
          </li>
        </ul>
      </div>
      <div>{children}</div>
    </div>
  );
}
