import { Component, WritableSignal, forwardRef, signal } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { BaseSelectInputComponent } from "./base-select-input.component";

/**
 * A selection input that only allows single selection.
 */
@Component({
  selector: "single-select-input",
  templateUrl: "base-select-input.component.html",
  styleUrl: "base-select-input.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleSelectInputComponent),
      multi: true
    }
  ],
  standalone: true
})
export class SingleSelectInputComponent extends BaseSelectInputComponent<number | null> {
  // #region State
  protected selectedIndex: WritableSignal<number | null> = signal<number | null>(null);
  // #endregion

  // #region BaseSelectInputComponent
  protected override isItemSelected(index: number): boolean {
    return this.selectedIndex() === index;
  }

  protected override changeItemSelection(index: number): void {
    if (this.isDisabled()) {
      return;
    }

    if (this.selectedIndex() === index) {
      this.selectedIndex.set(null);
    }
    else {
      this.selectedIndex.set(index);
    }
    
    this.onChange(this.selectedIndex());
  }
  // #endregion

  // #region BaseInputDirective
  public writeValue(val: number | null): void {
    this.selectedIndex.set(val);
  }
  // #endregion
}
