import {
  Component, InputSignal, InputSignalWithTransform, Signal, WritableSignal,
  booleanAttribute, computed, forwardRef, input, signal
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { BaseInputDirective } from "@sheet/inputs";

@Component({
  selector: "check-box-input",
  templateUrl: "check-box-input.component.html",
  styleUrl: "check-box-input.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckBoxInputComponent),
      multi: true
    }
  ],
  standalone: true
}) export class CheckBoxInputComponent extends BaseInputDirective<(boolean | null)[]> {
  // #region Inputs
  public checkBoxTexts: InputSignal<string[]> = input.required();
  public showControls: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, { transform: booleanAttribute });
  // #endregion

  // #region State
  /**
   * A tri-state that represents: checked, unchecked, and disabled (null).
   */
  protected checkBoxes: WritableSignal<(boolean | null)[]> = signal([]);
  // #endregion

  // #region Computes
  protected nbrOfCheckBoxes: Signal<number> = computed<number>(() => {
    return this.checkBoxTexts().length;
  })

  protected isCheckBoxDisabledArr: Signal<boolean[]> = computed(() => {
    const arr: boolean[] = new Array<boolean>(this.nbrOfCheckBoxes());

    for (let i = 0; i < this.nbrOfCheckBoxes(); i++) {
      arr[i] = this.checkBoxes()[i] === null;
    }

    return arr;
  });
  // #endregion

  // #region Checkbox Controls
  protected onCheckBoxClick(index: number, event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const arr: (boolean | null)[] = this.checkBoxes().slice();
    arr[index] = element.checked;

    this.checkBoxes.set(arr);
    this.onChange(this.checkBoxes());
  }

  protected onCheckBoxCtrlClick(index: number): void {
    const arr: (boolean | null)[] = this.checkBoxes().slice();

    // If the state was null, then clicking enables the checkbox. Default to false. Otherwise, set it to null to disable it.
    arr[index] = arr[index] === null ? false : null;

    this.checkBoxes.set(arr);
    this.onChange(this.checkBoxes());
  }
  // #endregion

  // #region BaseInputDirective
  public writeValue(val: (boolean | null)[]): void {
    this.checkBoxes.set(val.slice());
  }
  // #endregion
}
