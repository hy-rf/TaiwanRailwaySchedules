"use client";
export default function StoredStations() {
  return (
    <>
      <h3>Stored stations</h3>
      {localStorage.length}
    </>
  );
}
