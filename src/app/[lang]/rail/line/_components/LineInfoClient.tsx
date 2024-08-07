"use client";
import LineInfo from "@/type/rail/line/LineInfo";
import StopTime from "@/type/rail/line/StopTime";
import { useState } from "react";
async function getTodayLineStops(LineID: string) {
  const data = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/line/${LineID}`
  );
  return data;
}
export default function LineInfoClient({ params, searchParams }: any) {
  const [trainNo, setTrainNo] = useState("");
  const [lineInfo, setLineInfo] = useState<Array<LineInfo>>();

  return (
    <>
      <p>輸入車號：</p>
      <input
        onChange={(e) => setTrainNo(e.target.value)}
        className="border-2 border-gray-400 border-solid m-px"
      />
      <button
        onClick={() => {
          getTodayLineStops(trainNo)
            .then((ret) => ret.json())
            .then((ret) => {
              setLineInfo(ret);
            });
        }}
      >
        取得線路資訊
      </button>
      {lineInfo != undefined && (
        <>
          {" "}
          {lineInfo.length == 0 && (
            <>
              <b className="text-xl antialiased">線路： Not running</b>
            </>
          )}
          {lineInfo.length > 0 && (
            <>
              <hr />
              <div className="flex flex-row">
                <div>
                  <b className="text-xl antialiased">
                    線路：
                    {lineInfo[0].DailyTrainInfo.TrainNo}
                  </b>
                  <p>延遲時間：{lineInfo[0].DelayTime}分</p>
                  <h3 className="text-xl antialiased">
                    車種：{lineInfo[0].DailyTrainInfo.TrainTypeName.Zh_tw}
                  </h3>
                </div>
                <p>備註：{lineInfo[0].DailyTrainInfo.Note.Zh_tw}</p>
              </div>
              <p className="text-x antialiased">
                起程站：{" "}
                <a
                  className="text-blue-500 underline"
                  href={`/rail/station/${lineInfo[0].DailyTrainInfo.StartingStationID}`}
                >
                  {lineInfo[0].DailyTrainInfo.StartingStationName.Zh_tw}
                </a>
              </p>
              <p className="text-x antialiased">
                終點站：{" "}
                <a
                  className="text-blue-500 underline"
                  href={`/rail/station/${lineInfo[0].DailyTrainInfo.EndingStationID}`}
                >
                  {lineInfo[0].DailyTrainInfo.EndingStationName.Zh_tw}
                </a>
              </p>
              {lineInfo[0].StopTimes.map((ele: StopTime, index: number) => {
                return (
                  <div className="p-3" key={ele.StopSequence}>
                    <p>第{ele.StopSequence}站</p>
                    <p>
                      站名：{" "}
                      <a
                        className="text-blue-500 underline"
                        href={`/rail/station/${ele.StationID}`}
                      >
                        {ele.StationName.Zh_tw}
                      </a>
                    </p>
                    <p> 站號：{ele.StationID}</p>
                    <p>到達時間：{ele.ArrivalTime}</p>
                    <p>離站時間：{ele.DepartureTime}</p>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
}
