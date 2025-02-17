import { SheetFormElementBase } from "./sheet-form-element-base";
import { SheetFormElementTypes } from "./sheet-form-element-types";

export class SheetFormTextField extends SheetFormElementBase<string> {
  public override controlType: SheetFormElementTypes = SheetFormElementTypes.Text;
}
