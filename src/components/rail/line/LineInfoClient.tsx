"use client";
import LineInfo from "@/type/rail/line/LineInfo";
import StopTime from "@/type/rail/line/StopTime";
import { useEffect, useState } from "react";
async function getTodayLineStops(LineID: string) {
  const data = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/line/${LineID}`
  );
  return data;
}
export default function LineInfoClient({ params, searchParams }: any) {
  const [inputValue, setInputValue] = useState("");
  const [trainNo, setTrainNo] = useState("");
  const [lineInfo, setLineInfo] = useState<Array<LineInfo>>();

  return (
    <>
      <input
        onChange={(e) => setTrainNo(e.target.value)}
        style={{
          border: "1px grey solid",
          margin: "5px",
        }}
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
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
                  href={`/rail/station/${lineInfo[0].DailyTrainInfo.StartingStationID}`}
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                  }}
                >
                  {lineInfo[0].DailyTrainInfo.StartingStationName.Zh_tw}
                </a>
              </p>
              <p className="text-x antialiased">
                終點站：{" "}
                <a
                  href={`/rail/station/${lineInfo[0].DailyTrainInfo.EndingStationID}`}
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                  }}
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
                        style={{
                          color: "blue",
                        }}
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
