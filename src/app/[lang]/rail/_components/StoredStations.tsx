"use client";

import TRAStationInfo from "@/type/rail/station/TRAStationInfo";
import { useEffect, useState } from "react";

export default function StoredStations({ title }: { title: string }) {
  const [storedStations, setStoredStations] = useState<Array<TRAStationInfo>>(
    new Array<TRAStationInfo>()
  );
  useEffect(() => {
    const stations = window.localStorage.getItem("stations") || "";
    if (stations !== "") {
      const ret = JSON.parse(stations) as Array<TRAStationInfo>;
      setStoredStations(ret);
    }
  }, []);
  return (
    <>
      <h3>{title}</h3>
      {storedStations.map((ele, index) => {
        return (
          <div
            key={index}
            style={{
              border: "1px solid grey",
              textAlign: "center",
            }}
          >
            <a
              style={{
                color: "blue",
                textDecoration: "underline",
                fontSize: 22,
              }}
              href={`/rail/station/${ele.StationID}`}
            >
              {ele.StationName.Zh_tw}
            </a>
            <p>
              位置：
              {ele.LocationCity}
              {ele.LocationTown}
            </p>
          </div>
        );
      })}
    </>
  );
}
