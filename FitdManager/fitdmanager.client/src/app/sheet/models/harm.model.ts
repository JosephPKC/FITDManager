import { DataTableModel } from "@sheet/models";

export interface HarmModel {
  minorHarm: DataTableModel;
  moderateHarm: DataTableModel;
  majorHarm: DataTableModel;
  fatalHarm: DataTableModel;
  examples: string;
}
