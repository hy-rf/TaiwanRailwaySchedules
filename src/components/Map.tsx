"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
function ChangeLocation(location: number[]) {
  const map = useMap();
  map.panTo([location[0], location[1]]);
}
export default function Map() {
  async function getPos() {
    let pos: number[] = [];
    navigator.geolocation.getCurrentPosition((p) => {
      pos[0] = p.coords.latitude;
      pos[1] = p.coords.longitude;
    });

    return pos;
  }
  useEffect(() => {
    (async () => {
      const pos = await getPos();
      const map = useMap();
      map.panTo([pos[0], pos[1]]);
    })();
  }, []);

  return (
    <>
      <MapContainer
        center={[0, 0]}
        zoom={15}
        scrollWheelZoom={false}
        className="fixed"
        style={{
          height: "30rem",
          width: "100dvw",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}
