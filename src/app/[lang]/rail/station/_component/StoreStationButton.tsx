"use client";

import TRAStationInfo from "@/type/rail/station/TRAStationInfo";
import toast from "react-hot-toast";

export default function StoreStationButton({
  station,
}: {
  station: TRAStationInfo;
}) {
  return (
    <button
      onClick={() => {
        storeStation(station);
      }}
    >
      保存
    </button>
  );
}
function storeStation(station: TRAStationInfo) {
  const stations = window.localStorage.getItem("stations") || "";
  const ret =
    stations.length == 0
      ? new Array<TRAStationInfo>()
      : (JSON.parse(stations) as Array<TRAStationInfo>);
  if (ret.find((ele) => ele.StationUID == station.StationUID)) {
    toast(`已經存了！`);
    return;
  }
  ret.push(station);
  localStorage.setItem("stations", JSON.stringify(ret));
}
