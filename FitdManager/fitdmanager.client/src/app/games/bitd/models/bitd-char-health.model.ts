import { ArmorModel, HarmModel, TrackModel, TraumaModel } from "@sheet/models";

export interface BitdCharHealthModel {
  stress: TrackModel;
  trauma: TraumaModel;
  harm: HarmModel;
  healing: TrackModel;
  armor: ArmorModel;
}
