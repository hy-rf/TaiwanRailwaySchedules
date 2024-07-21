import TimeBoard from "@/type/rail/station/TimeBoard";
import { getDictionary } from "../../dictionaries";
import StationLink from "@/components/rail/StationLink";
import axios from "axios";
async function getTimeBoard(StationID: string) {
  return await axios(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/timeboard/${StationID}`
  ).then((ret) => ret.data);
}
export default async function Page({ params, searchParams }: any) {
  const timeBoard: Array<TimeBoard> = await getTimeBoard(searchParams.sid);
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
              車號:{" "}
              <a
                href={`/rail/line?tn=${ele.TrainNo}`}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                {ele.TrainNo}
              </a>
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
