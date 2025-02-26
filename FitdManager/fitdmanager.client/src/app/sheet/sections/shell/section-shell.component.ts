import {
  Component, InputSignal, OutputEmitterRef, Signal, WritableSignal,
  computed, input, linkedSignal, output, signal
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

  // If the section needs to do extra processing when the section locks/unlocks, it can bind to this.
  public onSectionLockChange: OutputEmitterRef<boolean> = output<boolean>();
  // #endregion

  // #region Internals
  protected isSectionHidden: WritableSignal<boolean> = signal<boolean>(false);
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
    this.onSectionLockChange.emit(locked);
  }

  protected onChangeHide(hidden: boolean): void {
    this.isSectionHidden.set(hidden);
  }
  // #endregion
}
