import {
  Directive,  InputSignal,  ModelSignal, OnChanges, OnInit, Signal,
  WritableSignal,
  computed, input, model,
  signal
} from "@angular/core";

import { BaseSectionDirective } from "@app/sheet-viewer/sections";

/*
- Custom section base that adds additional controls to make its form editable or not.
*/
@Directive({
  selector: 'base-edit-section'
})
export abstract class BaseEditSectionDirective extends BaseSectionDirective implements OnChanges, OnInit {
  // #region Params
  //public isEditable: ModelSignal<boolean> = model<boolean>(true);
  public isEditable: InputSignal<boolean> = input<boolean>(false);
  // #endregion

  // #region Internal
  protected isEditableSection: WritableSignal<boolean> = signal<boolean>(false);

  protected sectionClass: Signal<string> = computed<string>(() => {
    let className: string = 'div-section';

    if (this.isEditableSection()) {
      className += ' div-section-unlocked'
    }
    else {
      className += ' div-section-locked'
    }

    return className;
  })

  protected sectionInputsClass: Signal<string> = computed<string>(() => {
    let className: string = 'div-section-fields';

    if (!this.isEditableSection()) {
      className += ' div-disabled';
    }

    return className;
  });
  // #endregion

  // #region Extra Lifecycle Logic
  protected override additionalOnInit(): void {
    super.additionalOnInit();

    this.setEditableToForm(this.isEditableSection());
  }

  protected override additionalOnChanges(): void {
    super.additionalOnChanges();

    // The global editability overrides section editability
    this.isEditableSection.set(this.isEditable());

    if (this.sectionGroup !== undefined) {
      this.setEditableToForm(this.isEditableSection());
    }
  }
  // #endregion

  // #region Editable Controls
  protected onChangeEditable(value: boolean): void {
    this.isEditableSection.set(value);
    this.setEditableToForm(this.isEditableSection());
  }
  // #endregion
}
