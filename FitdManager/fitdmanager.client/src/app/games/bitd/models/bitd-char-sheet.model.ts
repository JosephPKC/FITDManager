import { BitdCharAbilityModel, BitdCharActionModel, BitdCharBasicModel, BitdCharCoinModel, BitdCharContactModel, BitdCharHealthModel } from "@games/bitd/models";
import { BitdCharItemModel } from "./bitd-char-item.model";

export interface BitdCharSheetModel {
  basic: BitdCharBasicModel;
  health: BitdCharHealthModel;
  action: BitdCharActionModel;
  coin: BitdCharCoinModel;
  ability: BitdCharAbilityModel;
  contact: BitdCharContactModel;
  item: BitdCharItemModel;
}
