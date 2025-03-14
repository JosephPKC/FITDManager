import { BitdCharActionModel, BitdCharBasicModel, BitdCharCoinModel, BitdCharHealthModel } from "@games/bitd/models";

export interface BitdCharSheetModel {
  basic: BitdCharBasicModel;
  health: BitdCharHealthModel;
  action: BitdCharActionModel;
  coin: BitdCharCoinModel;
}
