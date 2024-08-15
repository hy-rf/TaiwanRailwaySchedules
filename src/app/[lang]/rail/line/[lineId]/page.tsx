import LineInfo from "@/type/rail/line/LineInfo";
import StopTime from "@/type/rail/line/StopTime";
import { getDictionary } from "@/app/[lang]/dictionaries";
import StationLink from "@/app/[lang]/rail/_components/StationLink";
import axios from "axios";
async function getTodayLineStops(LineID: string) {
  return await axios(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/line/${LineID}`
  ).then((ret) => ret.data);
}
export default async function Page({ params }: any) {
  const lineInfo: Array<LineInfo> = await getTodayLineStops(params.lineId);
  const dict = await getDictionary(params.lang);
  const utc8TimeNow: string = new Date()
    .toLocaleString("en-US", {
      timeZone: "Asia/Taipei",
      hourCycle: "h23",
    })
    .split(", ")[1]
    .split(":")
    .join("")
    .slice(0, 4);
  console.log(utc8TimeNow);

  if (lineInfo.length == 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          {dict.main.rail.line.title}
          <span className="text-red-500 ml-2">Not running</span>
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {dict.main.rail.line.title}
        {lineInfo[0].DailyTrainInfo.TrainNo}
      </h1>

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        {lineInfo[0].DelayTime === -1 ? (
          <p className="text-red-500">延遲時間：請求過於頻繁，請稍後再試。</p>
        ) : (
          <p>延遲時間：<span className="font-semibold">{lineInfo[0].DelayTime}分</span></p>
        )}
        <h3 className="text-xl mt-2">
          車種：<span className="font-semibold">{lineInfo[0].DailyTrainInfo.TrainTypeName.Zh_tw}</span>
        </h3>
        <p className="mt-2">
          起程站：
          <StationLink
            stationId={lineInfo[0].DailyTrainInfo.StartingStationID}
            stationName={lineInfo[0].DailyTrainInfo.StartingStationName.Zh_tw}
          />
        </p>
        <p className="mt-1">
          終點站：
          <StationLink
            stationId={lineInfo[0].DailyTrainInfo.EndingStationID}
            stationName={lineInfo[0].DailyTrainInfo.EndingStationName.Zh_tw}
          />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lineInfo[0].StopTimes.map((ele: StopTime) => (
          <div key={ele.StopSequence} className="bg-white shadow-md rounded-lg p-4">
            <p className="font-semibold mb-2">第{ele.StopSequence}站</p>
            <p>
              站名：
              <StationLink
                stationId={ele.StationID}
                stationName={ele.StationName.Zh_tw}
              />
            </p>
            <p className="text-gray-600">站號：{ele.StationID}</p>
            <p className="mt-2">到達時間：<span className="font-semibold">{ele.ArrivalTime}</span></p>
            <p>離站時間：<span className="font-semibold">{ele.DepartureTime}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
