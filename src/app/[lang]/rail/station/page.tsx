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
            <a href={`/rail/line?tn=${ele.TrainNo}`}>車號: {ele.TrainNo}</a>
            <p>往: {ele.EndingStationName.Zh_tw}</p>
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
