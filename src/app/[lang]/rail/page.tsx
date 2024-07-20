"use client";

import LineInfoClient from "@/components/rail/LineInfoClient";
import NearStation from "@/components/rail/NearStation";
import TimeBoard from "@/type/rail/TimeBoard";
import { useEffect, useState } from "react";

async function getTimeBoard(StationID: string) {
  const data = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/timeboard/${StationID}`
  );
  return data;
}
export const revalidate = 0;
export default function Page() {
  const [station, setStation] = useState("");
  const [timeBoard, setTimeBoard]: [Array<TimeBoard>, any] = useState([]);

  return (
    <div className="p-1">
      <LineInfoClient />
      <p></p>
    </div>
  );
}
