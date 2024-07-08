import StationName from "./StationName";
import TrainTypeName from "./TrainTypeName";

export default interface TimeBoard {
  StationID: string;
  StationName: StationName;
  TrainNo: string;
  Direction: number;
  TrainTypeID: string;
  TrainTypeCode: string;
  TrainTypeName: TrainTypeName;
  TripLine: number;
  EndingStationID: string;
  EndingStationName: StationName;
  ScheduledArrivalTime: string;
  ScheduledDepartureTime: string;
  // minute
  DelayTime: number;
  SrcUpdateTime: string;
  UpdateTime: string;
}
