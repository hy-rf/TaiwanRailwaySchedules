"use client";
import TRAStationInfo from "@/type/rail/TRAStationInfo";
import geohash from "ngeohash";
import { useEffect } from "react";

export default function NearStation() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((p) => {
      const geoHash = geohash.encode(p.coords.latitude, p.coords.longitude);
      (async () => {
        const stations: Array<TRAStationInfo> = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/station`
        ).then((res) => res.json());
        stations.forEach((ele) => {
          if (
            ele.P.GeoHash.slice(0, 4) == geoHash.slice(0, 4) &&
            Math.abs(ele.P.GeoHash.charCodeAt(4) - geoHash.charCodeAt(4)) <= 1
          ) {
            console.log(ele);
          }
        });
      })();
    });
  }, []);
  return <></>;
}
