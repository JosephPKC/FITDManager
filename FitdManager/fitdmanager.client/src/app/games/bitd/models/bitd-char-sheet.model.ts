import { BitdCharActionModel, BitdCharBasicModel, BitdCharHealthModel } from "@games/bitd/models";

export interface BitdCharSheetModel {
  basic: BitdCharBasicModel;
  health: BitdCharHealthModel;
  action: BitdCharActionModel;
}
