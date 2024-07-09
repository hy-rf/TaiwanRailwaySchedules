import StationName from "./StationName";
import StationPosition from "./StationPosition";

export default interface TRAStationInfo {
  SID: string;
  SN: StationName;
  LC: string;
  LT: string;
  P: StationPosition;
}
