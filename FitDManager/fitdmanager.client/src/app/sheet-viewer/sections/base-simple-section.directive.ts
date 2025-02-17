import {
  Directive, InputSignal, OnChanges, OnInit,
  input
} from "@angular/core";

import { BaseSectionDirective } from "@app/sheet-viewer/sections";

/*
- Custom section base that does not have extra controls.
- It is meant to represent simple combinations of inputs.
*/
@Directive({
  selector: 'base-simple-section'
})
export abstract class BaseSimpleSectionDirective extends BaseSectionDirective implements OnChanges, OnInit {
  // #region Params
  public isEditable: InputSignal<boolean> = input<boolean>(false);
  // #endregion

  // #region Extra Lifecycle Logic
  protected override additionalOnInit(): void {
    super.additionalOnInit();

    this.setEditableToForm(this.isEditable());
  }

  protected override additionalOnChanges(): void {
    super.additionalOnChanges();

    if (this.sectionGroup !== undefined) {
      this.setEditableToForm(this.isEditable());
    }
  }
  // #endregion
}
