"use client";
import TRAStationInfo from "@/type/rail/TRAStationInfo";
import geohash from "ngeohash";
import { useEffect, useState } from "react";
async function getNearStations(geoHash: string) {
  const stations: Array<TRAStationInfo> = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/station`
  ).then((res) => res.json());
  let nearStations: any[] = [];
  stations.forEach((ele) => {
    if (
      ele.P.GeoHash.slice(0, 4) == geoHash.slice(0, 4) &&
      Math.abs(ele.P.GeoHash.charCodeAt(4) - geoHash.charCodeAt(4)) <= 1
    ) {
      console.log(ele);

      nearStations.push(ele);
    }
  });
  return nearStations;
}
export default function NearStation() {
  const [nearStations, setNearStations] = useState<Array<TRAStationInfo>>();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((p) => {
      const geoHash = geohash.encode(p.coords.latitude, p.coords.longitude);
      const nearStations = getNearStations(geoHash);
      (async () => {
        setNearStations(await nearStations);
      })();
    });
  }, []);
  return (
    <>
      <h3>最近車站</h3>
      {nearStations?.map((ele, index) => {
        return (
          <div key={index}>
            <a href={`/rail/station?sid=${ele.SID}`}>
              站名:{" "}
              <span
                style={{
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                {ele.SN.Zh_tw}
              </span>
            </a>
            <p>站號: {ele.SID}</p>
          </div>
        );
      })}
    </>
  );
}
