"use client";

import StoreStationButton from "@/components/rail/station/StoreStationButton";
import TRAStationInfo from "@/type/rail/station/TRAStationInfo";
import { useEffect, useState } from "react";

export default function StationList() {
  const [searchText, setSearchText] = useState("");
  const [searchTextInput, setSeatchTextInput] = useState("");
  const [stationList, setStationList] = useState<Array<TRAStationInfo>>(
    new Array<TRAStationInfo>()
  );
  const [filteredStationList, setFilteredStationList] = useState<
    Array<TRAStationInfo>
  >(new Array<TRAStationInfo>());
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/station`)
      .then((res) => res.json() as unknown as Array<TRAStationInfo>)
      .then((ret) => {
        if (searchText != "") {
          ret = ret.filter((ele) =>
            new RegExp(searchText).test(ele.StationName.Zh_tw)
          );
        }
        setStationList(ret);
        setFilteredStationList(ret);
      });
    console.log(setStationList);
  }, []);
  useEffect(() => {
    if (searchText === "") {
      setFilteredStationList(stationList);
    } else {
      setFilteredStationList(
        stationList.filter(
          (ele) =>
            new RegExp(searchText).test(ele.StationName.Zh_tw) ||
            new RegExp(searchText.toLowerCase()).test(
              ele.StationName.En.toLowerCase()
            ) ||
            new RegExp(searchText).test(ele.LocationCity) ||
            new RegExp(searchText).test(ele.LocationTown)
        )
      );
    }
  }, [searchText]);
  return (
    <>
      <p>輸入關鍵字：</p>
      <input
        type="text"
        value={searchTextInput}
        onChange={(e) => setSeatchTextInput(e.target.value)}
        style={{
          border: "1px grey solid",
          margin: "5px",
        }}
      />
      <button
        onClick={() => {
          setSearchText(searchTextInput);
        }}
      >
        過濾
      </button>
      <hr />
      <div
        style={{
          backgroundColor: "rgba(128, 128, 128, 0.24)",
        }}
      >
        {filteredStationList.map((ele, index) => {
          return (
            <div
              key={index}
              style={{
                border: "1px solid grey",
                textAlign: "center",
              }}
            >
              <a
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  fontSize: 22,
                }}
                href={`/rail/station/${ele.StationID}`}
              >
                {ele.StationName.Zh_tw}
              </a>
              <p>
                位置：
                {ele.LocationCity}
                {ele.LocationTown}
              </p>
              <StoreStationButton station={ele} />
            </div>
          );
        })}
      </div>
    </>
  );
}
