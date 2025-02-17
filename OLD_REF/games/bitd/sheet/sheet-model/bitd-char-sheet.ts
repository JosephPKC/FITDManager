export interface IBitdCharSheet {
  id: string,
	crewName: string,
  name: string,
  alias: string,
  look: string,
  heritage: string,
  background: string,
  vice: string,
  purveyor: string
}

export class BitdCharSheet implements IBitdCharSheet {
  public id: string;
  public crewName: string;
  public name: string;
  public alias: string;
  public look: string;
  public heritage: string;
  public background: string;
  public vice: string;
  public purveyor: string;

  constructor() {
    this.id = '';
    this.crewName = '';
    this.name = '';
    this.alias = '';
    this.look = '';
    this.heritage = '';
    this.background = '';
    this.vice = '';
    this.purveyor = '';
  }
}


