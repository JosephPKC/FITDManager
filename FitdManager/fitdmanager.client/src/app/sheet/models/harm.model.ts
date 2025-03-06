import { DataTableModel } from "@sheet/models";

export interface HarmModel {
  minorHarm: DataTableModel;
  moderateHarm: DataTableModel;
  majorHarm: DataTableModel;
  examples: string;
}
