import { SelectTableInfo, TrackInfo } from "@shared/models";
import { CharHarm } from "./harm.model";

export interface BitdCharHealth {
  stress: TrackInfo;
  trauma: SelectTableInfo;
  harm: CharHarm;
}
