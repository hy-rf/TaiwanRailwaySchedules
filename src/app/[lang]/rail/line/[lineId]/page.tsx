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
      <>
        <b className="text-xl antialiased">
          {dict.main.rail.line.title}
          Not running
        </b>
      </>
    );
  }
  return (
    <>
      <b className="text-xl antialiased">
        {dict.main.rail.line.title}
        {lineInfo[0].DailyTrainInfo.TrainNo}
      </b>
      {lineInfo[0].DelayTime === -1 && (
        <p>延遲時間：請求過於頻繁，請稍後再試。</p>
      )}
      {lineInfo[0].DelayTime !== -1 && (
        <p>延遲時間：{lineInfo[0].DelayTime}分</p>
      )}
      <h3 className="text-xl antialiased">
        車種：{lineInfo[0].DailyTrainInfo.TrainTypeName.Zh_tw}
      </h3>
      <p className="text-x antialiased">
        起程站：{" "}
        <StationLink
          stationId={lineInfo[0].DailyTrainInfo.StartingStationID}
          stationName={lineInfo[0].DailyTrainInfo.StartingStationName.Zh_tw}
        />
      </p>
      <p className="text-x antialiased">
        終點站：{" "}
        <StationLink
          stationId={lineInfo[0].DailyTrainInfo.EndingStationID}
          stationName={lineInfo[0].DailyTrainInfo.EndingStationName.Zh_tw}
        />
      </p>
      {lineInfo[0].StopTimes.map((ele: StopTime, index: number) => {
        return (
          <div className="p-3" key={ele.StopSequence}>
            <p>第{ele.StopSequence}站</p>
            <p>
              站名：{" "}
              <StationLink
                stationId={ele.StationID}
                stationName={ele.StationName.Zh_tw}
              />
            </p>
            <p> 站號：{ele.StationID}</p>
            <p>到達時間：{ele.ArrivalTime}</p>
            <p>離站時間：{ele.DepartureTime}</p>
          </div>
        );
      })}
    </>
  );
}
