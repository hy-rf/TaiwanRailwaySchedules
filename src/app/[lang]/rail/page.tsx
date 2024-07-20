import LineInfoClient from "@/components/rail/LineInfoClient";
import NearStation from "@/components/rail/NearStation";
import TimeBoard from "@/type/rail/TimeBoard";
import { useEffect, useState } from "react";

export const revalidate = 0;
export default function Page() {
  return (
    <div className="p-1">
      <LineInfoClient />
    </div>
  );
}
