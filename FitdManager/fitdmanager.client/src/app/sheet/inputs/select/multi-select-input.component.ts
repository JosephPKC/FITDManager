import {
  Component, InputSignalWithTransform, SimpleChanges, WritableSignal,
  forwardRef, input, numberAttribute, signal
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

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
export class MultiSelectInputComponent extends BaseSelectInputComponent<number[]> {
  // #region Inputs
  public maxSelects: InputSignalWithTransform<number, unknown> = input<number, unknown>(1, { transform: numberAttribute });
  // #endregion

  // #region State
  protected selectedIndices: WritableSignal<Set<number>> = signal<Set<number>>(new Set<number>());
  // #endregion

  // #region BaseSelectInputComponent
  protected override isItemSelected(index: number): boolean {
    return this.selectedIndices().has(index);
  }

  protected override changeItemSelection(index: number): void {
    if (this.isLocked()) {
      return;
    }

    if (this.selectedIndices().size >= this.maxSelects() && !this.isItemSelected(index)) {
      // Do not allow adding more if the select is full,
      // But allow removal no matter what
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
    console.log(`change item selection`)
    this.onChange(Array.from(this.selectedIndices().values()));
  }
  // #endregion

  // #region BaseInputDirective
  public writeValue(val: number[]): void {
    this.selectedIndices.set(new Set<number>(val));
  }

  protected override validateInputChanges(changes: SimpleChanges): void {
    if (changes["maxSelects"]) {
      if (this.maxSelects() > this.itemList().length) {
        throw `Input 'maxSelects' must be less than the length of input 'itemList'. Currently ${this.maxSelects()}.`;
      }
    }
  }
  // #endregion
}
