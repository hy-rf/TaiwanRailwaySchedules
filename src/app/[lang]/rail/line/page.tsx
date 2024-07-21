import LineInfo from "@/type/rail/line/LineInfo";
import StopTime from "@/type/rail/line/StopTime";
import { getDictionary } from "../../dictionaries";
import StationLink from "@/components/rail/StationLink";
async function getTodayLineStops(LineID: string) {
  const data = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/line/${LineID}`
  );
  return data;
}
export default async function Page({ params, searchParams }: any) {
  const lineInfo: Array<LineInfo> = await (
    await getTodayLineStops(searchParams.tn)
  ).json();
  const dict = await getDictionary(params.lang);
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
      <p>延遲時間：{lineInfo[0].DelayTime}分</p>
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
