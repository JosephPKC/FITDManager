import { SheetFormElementTypes } from "./sheet-form-element-types";

export interface SheetFormElementBaseOptions<T> {
  initValue?: T;
  name?: string;
  label?: string;
  controlType?: SheetFormElementTypes;
  elementId?: string;
  order?: number
}

export class SheetFormElementBase<T> {
  public initValue?: T;
  public name: string;
  public label: string;
  public controlType: SheetFormElementTypes;
  public elementId: string;
  public order: number;

  constructor(options: SheetFormElementBaseOptions<T>) {
    this.initValue = options.initValue;
    this.name = options.name ?? '';
    this.label = options.label ?? '';
    this.controlType = options.controlType ?? SheetFormElementTypes.None;
    this.elementId = options.elementId ?? '';
    this.order = options.order === undefined ? 1 : options.order;
  }
}
