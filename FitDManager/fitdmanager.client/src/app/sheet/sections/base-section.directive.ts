import {
  Directive, Signal, WritableSignal,
  computed, linkedSignal, signal
} from "@angular/core";

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
  // #region Internals
  protected isSectionHidden: WritableSignal<boolean> = signal<boolean>(false);

  protected isSectionLocked: WritableSignal<boolean> = linkedSignal<boolean>(() => {
    return this.locked();
  });

  protected sectionClass: Signal<string> = computed<string>(() => {
    let className: string = "div-section";

    if (this.isSectionHidden()) {
      className += " div-section-hidden";
    }
    else {
      className += " div-section-shown";

      if (this.isSectionLocked()) {
        className += " div-section-locked"
      }
      else {
        className += " div-section-unlocked"
      }
    }

    return className;
  })
  // #endregion

  // #region Lock Controls
  protected onChangeLock(locked: boolean): void {
    this.isSectionLocked.set(locked);
    this.setControlLocks();
  }
  // #endregion

  // #region Hide Controls
  protected onChangeHide(hidden: boolean): void {
    console.log(`On change Hide`);
    this.isSectionHidden.set(hidden);
  }
  // #endregion

  // #region Helpers
  protected override getBaseInputsClass(): string {
    return "div-section-inputs";
  }

  protected override isDisabled(): boolean {
    return this.isSectionLocked();
  }

  protected override setControlLocks(): void {
    this.toggleControlLocks(this.isSectionLocked());
  }
  // #endregion
}
