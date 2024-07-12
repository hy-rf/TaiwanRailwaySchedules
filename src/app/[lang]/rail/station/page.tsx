import TimeBoard from "@/type/rail/TimeBoard";
async function getTimeBoard(StationID: string) {
  const data = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/timeboard/${StationID}`
  );
  return data;
}
export default async function Page({ searchParams }: any) {
  const timeBoard: Array<TimeBoard> = await (
    await getTimeBoard(searchParams.sid)
  ).json();
  return (
    <>
      <b className="text-xl antialiased">{timeBoard[0].StationName.Zh_tw} 開</b>
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
              往:{" "}
              <a
                href={`/rail/station?sid=${ele.EndingStationID}`}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                {ele.EndingStationName.Zh_tw}
              </a>
            </p>
            <span>到達時間: {ele.ScheduledArrivalTime.slice(0, -3)}</span>&nbsp;
            <span>離站時間: {ele.ScheduledDepartureTime.slice(0, -3)}</span>
            &nbsp;
            <span
              style={{
                color: "red",
              }}
            >
              延遲時間: {ele.DelayTime}分
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
