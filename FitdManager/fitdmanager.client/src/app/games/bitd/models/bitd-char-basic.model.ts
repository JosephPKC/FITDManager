import { SelectTextModel } from "@sheet/models";

export interface BitdCharBasicModel {
  name: string;
  alias: string;
  look: string;
  background: SelectTextModel;
  heritage: SelectTextModel;
  vice: SelectTextModel;
}
