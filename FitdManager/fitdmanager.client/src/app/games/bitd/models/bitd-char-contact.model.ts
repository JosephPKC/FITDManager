export interface BitdCharContactModel {
  contacts: ContactModel[];
}

export interface ContactModel {
  name: string;
  state: ContactState;
}

export enum ContactState {
  ALLY,
  NEUTRAL,
  RIVAL
}
