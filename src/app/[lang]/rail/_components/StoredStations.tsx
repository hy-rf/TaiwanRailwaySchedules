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
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h3 className="text-lg mb-2">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {storedStations.map((ele, index) => {
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
            >
              <div className="p-4">
                <a
                  className="text-xl font-semibold text-blue-600 hover:text-blue-800"
                  href={`/rail/station/${ele.StationID}`}
                >
                  {ele.StationName.Zh_tw}
                </a>
                <p className="text-gray-600 mt-2">
                  {ele.LocationCity} {ele.LocationTown}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
