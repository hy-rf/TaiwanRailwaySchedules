"use client";

import StoreStationButton from "./StoreStationButton";
import TRAStationInfo from "@/type/rail/station/TRAStationInfo";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function StationList({ dict }: { dict: any }) {
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
      <p>{dict.station_list_filter_input_text}</p>
      <input
        className="border-2 border-gray-400 border-solid m-1"
        type="text"
        value={searchTextInput}
        onChange={(e) => setSeatchTextInput(e.target.value)}
      />
      <button
        onClick={() => {
          setSearchText(searchTextInput);
        }}
      >
        {dict.station_list_filter_button_text}
      </button>
      <hr />
      <div className="bg-stone-300">
        {filteredStationList.map((ele, index) => {
          return (
            <div
              key={index}
              className="border-2 border-gray-400 border-solid text-center flex flex-row"
            >
              <div className="p-1">
                <a
                  className="text-blue-500 underline "
                  href={`/rail/station/${ele.StationID}`}
                >
                  {ele.StationName.Zh_tw}
                </a>
                <p>
                  {dict.station_list_location_text}
                  {ele.LocationCity}
                  {ele.LocationTown}
                </p>
              </div>
              <div className="p-1">
                <StoreStationButton
                  CustomToast={(text: string) => {
                    toast(text);
                  }}
                  station={ele}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
