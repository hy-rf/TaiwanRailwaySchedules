import { getDictionary } from "@/app/[lang]/dictionaries";
import axios from "axios";
import DailyStationsLines from "@/type/rail/station/DailyStationsLines";
import LineList from "./_components/LineList";
async function getLineList(StationID: string) {
  const utc8TimeNow: string[] = new Date()
    .toLocaleString("en-US", {
      timeZone: "Asia/Taipei",
      hourCycle: "h23",
    })
    .split(",")[0]
    .split("/");
  const today: string = `${utc8TimeNow[2]}-${utc8TimeNow[0].padStart(
    2,
    "0"
  )}-${utc8TimeNow[1].padStart(2, "0")}`;
  return await axios(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/station/${StationID}/line/${today}`
  ).then((ret) => ret.data);
}
export default async function Page({ params }: any) {
  const lineList: Array<DailyStationsLines> = await getLineList(
    params.stationId
  );
  const dict = await getDictionary(params.lang);
  if (lineList.length == 0) {
    return (
      <>
        <b className="text-xl antialiased">
          {dict.main.rail.station.title}
          No train
        </b>
      </>
    );
  }
  if (lineList.length == undefined) {
    return (
      <>
        <b className="text-xl antialiased">請求過於頻繁，請稍後再試。</b>
      </>
    );
  }
  return (
    <>
      <b className="text-xl antialiased">
        {dict.main.rail.station.title}
        {lineList[0].StationName.Zh_tw}
      </b>
      <LineList lineList={lineList} />
    </>
  );
}
