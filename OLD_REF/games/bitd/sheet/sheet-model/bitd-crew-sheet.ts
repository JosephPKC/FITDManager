export interface IBitdCrewSheet {
  id: string
}

export class BitdCrewSheet implements IBitdCrewSheet {
  public id: string;

  constructor() {
    this.id = '';
  }
}
