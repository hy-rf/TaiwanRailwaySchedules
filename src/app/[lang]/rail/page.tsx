"use client";

import TimeBoard from "@/type/rail/TimeBoard";
import { useEffect, useState } from "react";

async function getTimeBoard(StationID: string) {
  const data = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/timeboard/${StationID}`
  );

  return data;
}

export default function Page() {
  const [station, setStation] = useState("");
  const [timeBoard, setTimeBoard]: [Array<TimeBoard>, any] = useState([]);

  return (
    <div className="p-1">
      <input
        type="text"
        placeholder="station id"
        onChange={(e) => setStation(e.target.value)}
      />
      <button
        onClick={async () => {
          const data = await getTimeBoard(station);
          setTimeBoard(await data.json());
        }}
        style={{
          border: "1px solid black",
          borderRadius: "3px",
        }}
      >
        取得時刻表
      </button>
      <br />
      {timeBoard.length > 0 && (
        <b
          style={{
            fontSize: "1.2rem",
            fontStyle: "-moz-initial",
          }}
        >
          {timeBoard[0].StationName.Zh_tw} 開
        </b>
      )}
      {timeBoard.map((ele) => {
        return (
          <div className="p-3">
            <p>車號: {ele.TrainNo}</p>
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
    </div>
  );
}
