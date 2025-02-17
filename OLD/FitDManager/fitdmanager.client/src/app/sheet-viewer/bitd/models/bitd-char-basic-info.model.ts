import { TextSelectListCombo } from "@app/shared/models";

export interface BitdCharBasicInfo {
  name: string;
  alias: string;
  look: string;
  background: TextSelectListCombo;
  heritage: TextSelectListCombo;
  vice: TextSelectListCombo;
}
