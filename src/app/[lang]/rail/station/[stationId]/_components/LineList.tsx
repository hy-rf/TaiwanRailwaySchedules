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
    <div className="container mx-auto p-4">
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        onClick={() => setIsShowPassedOnly(!isShowPassedOnly)}
      >
        {isShowPassedOnly ? "顯示已離站列車" : "只顯示未來列車"}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lines.map((ele: DailyStationsLines) => {
          if (
            (isShowPassedOnly &&
              parseInt(ele.DepartureTime.split(":").join("")) >=
              parseInt(utc8TimeNow)) ||
            !isShowPassedOnly
          )
            return (
              <div className="bg-white shadow-md rounded-lg p-4" key={ele.TrainNo}>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg font-semibold">
                    車號: <LineLink lineId={ele.TrainNo} />
                  </p>
                  <span className="text-sm font-medium px-2 py-1 bg-gray-200 rounded-full">
                    {ele.Direction == 0 ? "北上" : "南下"}
                  </span>
                </div>
                <p className="text-gray-600">
                  往: <StationLink
                    stationId={ele.EndingStationID}
                    stationName={ele.EndingStationName.Zh_tw}
                  />
                </p>
                <div className="mt-2">
                  <p>到達時間：{ele.ArrivalTime}</p>
                  <p>離站時間：{ele.DepartureTime}</p>
                </div>
                <p className="text-red-500 mt-2">延遲時間：敬請期待</p>
                <p className="text-[#12ACAC] mt-2">{ele.TrainTypeName.Zh_tw}</p>
              </div>
            );
        })}
      </div>
    </div>
  );
}
