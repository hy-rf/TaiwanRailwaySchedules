import dynamic from "next/dynamic";
import { getDictionary } from "../../dictionaries";
const StationList = dynamic(() => import("./_components/StationList"), {
  loading: () => <p>Loading...</p>,
});
type Props = {
  params: {
    lang: string;
  };
};

const metadatas: any = {
  "en-US": {
    title: "Taiwan Rail Stations",
    description: "Get Taiwan Rail Stations List",
  },
  "zh-TW": {
    title: "台灣鐵路車站",
    description: "台灣鐵路車站列表",
  },
  "zh-CN": {
    title: "台湾铁路车站",
    description: "台湾铁路车站列表",
  },
};
export async function generateMetadata({ params }: Props) {
  return metadatas[params.lang];
}

export default async function Page({ params }: Props) {
  const dict = await getDictionary(params.lang);
  return (
    <div className="p-1">
      <StationList dict={dict} />
    </div>
  );
}
