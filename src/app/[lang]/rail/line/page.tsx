import LineInfo from "@/type/rail/LineInfo";
import StopTime from "@/type/rail/StopTime";
async function getTodayLineStops(LineID: string) {
  const data = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/line/${LineID}`
  );
  return data;
}
export default async function Page({ searchParams }: any) {
  const lineInfo: Array<LineInfo> = await (
    await getTodayLineStops(searchParams.tn)
  ).json();
  return (
    <>
      <b className="text-xl antialiased">
        起程站: {lineInfo[0].DailyTrainInfo.StartingStationName.Zh_tw}{" "}
        <span>{lineInfo[0].DailyTrainInfo.StartingStationID}</span>
      </b>
      <b className="text-xl antialiased">
        終點站: {lineInfo[0].DailyTrainInfo.EndingStationName.Zh_tw}{" "}
        <span>{lineInfo[0].DailyTrainInfo.EndingStationID}</span>
      </b>
      {lineInfo[0].StopTimes.map((ele: StopTime, index: number) => {
        return (
          <div className="p-3" key={ele.StopSequence}>
            <p>第: {ele.StopSequence} 站</p>
            <a
              style={{
                color: "blue",
              }}
              href={`/rail/station?sid=${ele.StationID}`}
            >
              站名: {ele.StationName.Zh_tw}
            </a>
            <span>站號: {ele.StationID}</span>
            <span>到達時間: {ele.ArrivalTime.slice(0, -3)}</span>&nbsp;
            <span>離站時間: {ele.DepartureTime.slice(0, -3)}</span>
          </div>
        );
      })}
    </>
  );
}
