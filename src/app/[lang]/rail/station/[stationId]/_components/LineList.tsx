"use client";
import LineLink from "@/app/[lang]/rail/_components/LineLink";
import StationLink from "@/app/[lang]/rail/_components/StationLink";
import DailyStationsLines from "@/type/rail/station/DailyStationsLines";
import { useState } from "react";

export default function LineList({
  lineList,
}: {
  lineList: Array<DailyStationsLines>;
}) {
  const [lines, setLines] = useState<Array<DailyStationsLines>>(lineList);
  const [isShowPassedOnly, setIsShowPassedOnly] = useState(true);
  const utc8TimeNow: string = new Date()
    .toLocaleString("en-US", {
      timeZone: "Asia/Taipei",
      hourCycle: "h23",
    })
    .split(", ")[1]
    .split(":")
    .join("")
    .slice(0, 4);
  return (
    <>
      <button
        className="pl-10 border-solid"
        onClick={() => setIsShowPassedOnly(!isShowPassedOnly)}
      >
        {isShowPassedOnly && <>顯示已離站列車</>}
        {!isShowPassedOnly && <>只顯示未來列車</>}
      </button>

      {lines.map((ele: DailyStationsLines) => {
        if (
          (isShowPassedOnly &&
            parseInt(ele.DepartureTime.split(":").join("")) >=
              parseInt(utc8TimeNow)) ||
          !isShowPassedOnly
        )
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
              <span className="text-red-500">延遲時間：敬請期待</span>
              <p className="text-[#12ACAC]">{ele.TrainTypeName.Zh_tw}</p>
              <hr />
            </div>
          );
      })}
    </>
  );
}
