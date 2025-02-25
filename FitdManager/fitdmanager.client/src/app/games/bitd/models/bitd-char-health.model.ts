import { TrackInfo } from "../../../shared/models/track-info.model";

export interface BitdCharHealth {
  stress: TrackInfo;
  traumaList: string[];
  selectedTrauma: number[];
}
