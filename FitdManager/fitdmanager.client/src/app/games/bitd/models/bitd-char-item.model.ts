export interface BitdCharItemModel {
  loadout: LoadoutModel;
  selectedGear: ItemModel[];
  playbookGear: ItemModel[];
  commonGear: ItemModel[];
  customGear: ItemModel[];
}

export enum LoadoutState {
  None,
  Light,
  Normal,
  Heavy
}
export interface LoadoutModel {
  state: LoadoutState;
  none: number;
  light: number;
  normal: number;
  heavy: number;
}

export interface ItemModel {
  name: string;
  boxes: number;
}
