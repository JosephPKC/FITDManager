import { Component, WritableSignal, forwardRef, signal } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { BaseSelectInputComponent } from "./base-select-input.component";

/**
 * A selection input that allows multiple selections.
 */
@Component({
  selector: "multi-select-input",
  templateUrl: "base-select-input.component.html",
  styleUrl: "base-select-input.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectInputComponent),
      multi: true
    }
  ],
  standalone: true
})
export class MultiSelectInputComponent extends BaseSelectInputComponent<number[]> implements ControlValueAccessor {
  // #region Internals
  protected selectedIndices: WritableSignal<Set<number>> = signal<Set<number>>(new Set<number>());
  // #endregion

  // #region BaseSelectInputComponent
  protected override isItemSelected(index: number): boolean {
    return this.selectedIndices().has(index);
  }

  protected override changeItemSelection(index: number): void {
    if (this.isDisabled()) {
      return;
    }

    let newSet: Set<number> = new Set<number>();
    for (let i = 0; i < this.nbrOfItems(); i++) {
      if (this.selectedIndices().has(i) && i !== index) {
        // Not the selected index, but already previously selected.
        newSet.add(i);
      }

      if (!this.selectedIndices().has(i) && i === index) {
        // Selected index, but was not previously selected.
        newSet.add(i);
      }

      // All others (selected index AND previously selected, or not selected index AND was previously unselected) stay unselected.
    }

    this.selectedIndices.set(newSet);

    this.onChange(Array.from(this.selectedIndices().values()));
  }
  // #endregion

  // #region ControlValueAccessor
  public registerOnChange(onChange: (value: number[]) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  public writeValue(val: number[]): void {
    this.selectedIndices.set(new Set<number>(val));
  }
  // #endregion
}
