import LineInfoClient from "@/app/[lang]/rail/line/_components/LineInfoClient";
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
    title: "台灣鐵路線路",
    description: "台灣鐵路線路列表",
  },
  "zh-CN": {
    title: "台湾铁路线路",
    description: "台湾铁路线路列表",
  },
};
export async function generateMetadata({ params }: Props) {
  return metadatas[params.lang];
}
export default function Page() {
  return (
    <div className="p-1">
      <LineInfoClient />
    </div>
  );
}
