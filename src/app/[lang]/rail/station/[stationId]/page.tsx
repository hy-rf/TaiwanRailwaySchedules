import TimeBoard from "@/type/rail/station/TimeBoard";
import { getDictionary } from "@/app/[lang]/dictionaries";
import StationLink from "@/components/rail/StationLink";
import axios from "axios";
import LineLink from "@/components/rail/LineLink";
async function getTimeBoard(StationID: string) {
  return await axios(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/timeboard/${StationID}`
  ).then((ret) => ret.data);
}
export default async function Page({ params }: any) {
  const timeBoard: Array<TimeBoard> = await getTimeBoard(params.stationId);
  const dict = await getDictionary(params.lang);
  console.log(timeBoard);

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
  return (
    <>
      <b className="text-xl antialiased">
        {dict.main.rail.station.title}
        {timeBoard[0].StationName.Zh_tw}
      </b>
      {timeBoard.map((ele: TimeBoard, index: number) => {
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
            <span>到達時間：{ele.ScheduledArrivalTime.slice(0, -3)}</span>&nbsp;
            <span>離站時間：{ele.ScheduledDepartureTime.slice(0, -3)}</span>
            &nbsp;
            <span
              style={{
                color: "red",
              }}
            >
              延遲時間：{ele.DelayTime}分
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
