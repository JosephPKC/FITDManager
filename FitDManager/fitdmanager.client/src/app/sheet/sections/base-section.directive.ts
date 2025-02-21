import {Directive, InputSignal, input} from "@angular/core";

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
  // #region Params
  public locked: InputSignal<boolean> = input<boolean>(true);
  // #endregion
}
