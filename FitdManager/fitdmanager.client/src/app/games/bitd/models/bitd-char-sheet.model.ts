import { BitdCharBasicInfo } from "@games/bitd/models/bitd-char-basic-info.model";
import { BitdCharHealth } from "@games/bitd/models/bitd-char-health.model";

export interface BitdCharSheet {
  basicInfo: BitdCharBasicInfo;
  health: BitdCharHealth;
}
