import { Directive, InputSignal, WritableSignal, input, linkedSignal} from "@angular/core";

import { BaseInputGroupDirective } from "@sheet/sections";

/**
 * Base for custom sections, which are containers for related inputs for forms.
 * Each section is modelled as its own form group.
 * Each section can be hidden and locked as a group.
 */
@Directive({
  selector: "base-section"
})
export abstract class BaseSectionDirective<TModel> extends BaseInputGroupDirective<TModel> {
  // #region Inputs
  public locked: InputSignal<boolean> = input<boolean>(true);
  // #endregion

  // #region State
  protected isSectionLocked: WritableSignal<boolean> = linkedSignal<boolean>(() => {
    return this.locked();
  });
  // #endregion

  // #region Section Locking
  protected onSectionLockChange(val: boolean): void {
    // Set the signal, so that it can inform the appropriate inputs.
    this.isSectionLocked.set(val);
  }
  // #endregion
}
