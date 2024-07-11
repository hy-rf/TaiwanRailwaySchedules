import React from "react";
const Map = React.lazy(() => import("@/components/Map"));

export default async function Page() {
  return (
    <>
      <Map></Map>
    </>
  );
}
