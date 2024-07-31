"use client";

import TRAStationInfo from "@/type/rail/station/TRAStationInfo";

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
  console.log(ret);
  ret.push(station);
  localStorage.setItem("stations", JSON.stringify(ret));
}
