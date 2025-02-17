import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { SheetFormElementBase } from "./elements/sheet-form-element-base";

@Component({
  selector: 'sheet-form-element',
  templateUrl: './sheet-form-element.component.html'
})
export class SheetFormElementComponent {
  @Input() public element!: SheetFormElementBase<string>;
  @Input() public form!: FormGroup;

  public get isValid(): boolean {
    return this.form.controls[this.element.name].valid;
  }
}
