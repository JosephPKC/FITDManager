import { ActionModel, TrackModel } from "@sheet/models";

export interface AttributeModel {
  name: string;
  rating: number;
  xp: TrackModel;
  actions: ActionModel[];
}
