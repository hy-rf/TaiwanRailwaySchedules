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
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <p className="text-lg mb-2">{dict.station_list_filter_input_text}</p>
        <div className="flex">
          <input
            className="border-2 border-gray-300 rounded-l-md p-2 focus:outline-none focus:border-blue-500"
            type="text"
            value={searchTextInput}
            onChange={(e) => setSeatchTextInput(e.target.value)}
            placeholder="Search stations..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-200"
            onClick={() => {
              setSearchText(searchTextInput);
            }}
          >
            {dict.station_list_filter_button_text}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStationList.map((ele, index) => (
          <div
            key={index}
            className="bg-gray-100 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
          >
            <div className="p-4">
              <a
                className="text-xl font-semibold text-blue-600 hover:text-blue-800"
                href={`/rail/station/${ele.StationID}`}
              >
                {ele.StationName.Zh_tw}
              </a>
              <p className="text-gray-600 mt-2">
                {dict.station_list_location_text} {ele.LocationCity} {ele.LocationTown}
              </p>
            </div>
            <div className="px-4 py-2">
              <StoreStationButton
                station={ele}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
