"use client";

import NearStation from "@/components/rail/NearStation";
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
      <NearStation />
    </div>
  );
}
