"use client";
// import TRAStationInfo from "@/type/rail/station/TRAStationInfo";
import geohash from "ngeohash";
import { useEffect, useState } from "react";
async function getNearStations(geoHash: string) {
  const stations: Array<any> = await fetch(
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
  const [nearStations, setNearStations] = useState<Array<any>>();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((p) => {
      const geoHash = geohash.encode(p.coords.latitude, p.coords.longitude);
      const nearStations = getNearStations(geoHash);
      (async () => {
        setNearStations(await nearStations);
      })();
    });
  }, []);
  if (nearStations == undefined) {
    return (
      <>
        <b className="text-xl antialiased">取得最近車站中。。。</b>
      </>
    );
  }
  if (nearStations.length == 0) {
    return (
      <>
        <b className="text-xl antialiased">取得最近車站失敗。。。</b>
      </>
    );
  }
  return (
    <>
      <b className="text-xl antialiased">最近車站</b>
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
