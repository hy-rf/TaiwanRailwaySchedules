import TimeBoard from "@/type/rail/station/TimeBoard";
import { getDictionary } from "@/app/[lang]/dictionaries";
import StationLink from "@/components/rail/StationLink";
import axios from "axios";
import LineLink from "@/components/rail/LineLink";
import DailyStationsLines from "@/type/rail/station/DailyStationsLines";
async function getTimeBoard(StationID: string) {
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
  const timeBoard: Array<DailyStationsLines> = await getTimeBoard(
    params.stationId
  );
  const dict = await getDictionary(params.lang);
  if (timeBoard.length == 0) {
    return (
      <>
        <b className="text-xl antialiased">
          {dict.main.rail.station.title}
          No train
        </b>
      </>
    );
  }
  if (timeBoard.length == undefined) {
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
        {timeBoard[0].StationName.Zh_tw}
      </b>
      {timeBoard.map((ele: DailyStationsLines, index: number) => {
        return (
          <div className="p-3" key={ele.TrainNo}>
            <p>
              車號: <LineLink lineId={ele.TrainNo} />
            </p>
            <p>
              方向：{ele.Direction == 0 && <span>北上</span>}
              {ele.Direction == 1 && <span>南下</span>}
            </p>
            <p>
              往:{" "}
              <StationLink
                stationId={ele.EndingStationID}
                stationName={ele.EndingStationName.Zh_tw}
              />
            </p>
            <span>到達時間：{ele.ArrivalTime}</span>&nbsp;
            <span>離站時間：{ele.DepartureTime}</span>
            &nbsp;
            <span
              style={{
                color: "red",
              }}
            >
              延遲時間：敬請期待
            </span>
            <p
              style={{
                color: "#12ACAC",
              }}
            >
              {ele.TrainTypeName.Zh_tw}
            </p>
            <hr />
          </div>
        );
      })}
    </>
  );
}
