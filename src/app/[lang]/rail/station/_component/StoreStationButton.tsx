"use client";

import TRAStationInfo from "@/type/rail/station/TRAStationInfo";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function StoreStationButton({
  station,
}: {
  station: TRAStationInfo;
}) {
  const [isShow, setIsShow] = useState(true);
  useEffect(() => {
    const stations = window.localStorage.getItem("stations") || "";
    const ret =
      stations.length == 0
        ? new Array<TRAStationInfo>()
        : (JSON.parse(stations) as Array<TRAStationInfo>);
    if (ret.find((ele) => ele.StationUID == station.StationUID)) {
      setIsShow(false);
    }
  }, []);
  return (
    <>
      <button
        style={{
          display: isShow ? "block" : "none",
        }}
        onClick={() => {
          storeStation(station);
          setIsShow(false);
        }}
      >
        保存
      </button>
    </>
  );
}
function storeStation(station: TRAStationInfo) {
  const stations = window.localStorage.getItem("stations") || "";
  const ret =
    stations.length == 0
      ? new Array<TRAStationInfo>()
      : (JSON.parse(stations) as Array<TRAStationInfo>);
  if (ret.find((ele) => ele.StationUID == station.StationUID)) {
    toast.error(`已經存了！`);
    return;
  }
  ret.push(station);
  localStorage.setItem("stations", JSON.stringify(ret));
  toast.success(`saved`);
  return;
}
