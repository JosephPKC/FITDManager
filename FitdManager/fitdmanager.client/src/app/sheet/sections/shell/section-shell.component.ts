import {
  Component, InputSignal, Signal, WritableSignal,
  computed, input, linkedSignal, signal
} from "@angular/core";

import { HideButtonComponent, LockButtonComponent } from "@shared/buttons";

/**
 * The outer shell for a section that handles common logic.
 * Includes locking/disabling the inputs and hiding the inputs.
 */
@Component({
  selector: "section-shell",
  templateUrl: "section-shell.component.html",
  styleUrl: "section-shell.component.scss",
  imports: [HideButtonComponent, LockButtonComponent]
})
export class SectionShellComponent {
  // #region Params
  public label: InputSignal<string> = input<string>("");
  public locked: InputSignal<boolean> = input<boolean>(true);
  public customInputsClass: InputSignal<string> = input<string>("");
  // #endregion

  // #region Internals
  protected isSectionHidden: WritableSignal<boolean> = signal<boolean>(false);

  // TODO: Certain inputs should be editable by default.
  // So, we'll need to have the actual section handle individual locking of its inputs rather than the section shell
  // Or, we can add custom classes to exclude certain inputs from this.
  protected isSectionLocked: WritableSignal<boolean> = linkedSignal<boolean>(() => {
    return this.locked();
  });

  protected sectionClass: Signal<string> = computed<string>(() => {
    let className: string = "div-section";

    if (this.isSectionLocked()) {
      className += " div-section-locked"
    }
    else {
      className += " div-section-unlocked"
    }

    return className;
  })

  protected divInputsClass: Signal<string> = computed<string>(() => {
    let className: string = "div-inputs-area";

    if (this.customInputsClass() !== "") {
      className += " " + this.customInputsClass();
    }

    if (this.isSectionLocked()) {
      className += " div-disabled";
    }
    else {
      className += " div-enabled";
    }

    return className;
  });
  // #endregion

  // #region Controls
  protected onChangeLock(locked: boolean): void {
    this.isSectionLocked.set(locked);
  }

  protected onChangeHide(hidden: boolean): void {
    this.isSectionHidden.set(hidden);
  }
  // #endregion
}
