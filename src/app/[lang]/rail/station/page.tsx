import GetStation from "@/components/rail/station/GetStation";
import TRAStationInfo from "@/type/rail/station/TRAStationInfo";
import axios from "axios";
type Prop = {
  city: string;
};
export default async function Page({ searchParams }: { searchParams: Prop }) {
  var stations = await axios(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/rail/station`
  ).then((res) => res.data as Array<TRAStationInfo>);
  if (searchParams.city) {
    stations = stations.filter((ele) =>
      new RegExp(searchParams.city).test(ele.LocationCity)
    );
  }
  return (
    <div className="p-1">
      <GetStation city={searchParams.city} />
      <div
        style={{
          backgroundColor: "rgba(128, 128, 128, 0.24)",
        }}
      >
        {stations.map((ele, index) => {
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
