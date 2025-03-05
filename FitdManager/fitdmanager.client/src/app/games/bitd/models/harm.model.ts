import { LimitArray } from "@shared/models";

export interface CharHarm {
  minorHarm: LimitArray<string>;
  moderateHarm: LimitArray<string>;
  majorHarm: LimitArray<string>;
  minorHeader: string;
  minorFooter: string;
  moderateHeader: string;
  moderateFooter: string;
  majorHeader: string;
  majorFooter: string;
  examples: string;
}
