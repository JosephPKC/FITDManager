import {
  Component, InputSignal, Signal, WritableSignal,
  computed, forwardRef, input, signal
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { smallDot } from "@app/shared/const";
import { getIndexByValue } from "@app/shared/utils";
import { BaseInputDirective } from "@app/sheet/inputs";

/**
 * A selection list input.
 * Think of it as a dropdown-list, with all of its options exposed in a line.
 * It is only single selection.
 */
@Component({
  selector: "select-input",
  templateUrl: "select-input.component.html",
  styleUrl: "select-input.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true
    }
  ],
  standalone: true
})
export class SelectInputComponent extends BaseInputDirective implements ControlValueAccessor {
  // #region Params
  public itemList: InputSignal<string[]> = input<string[]>([]);
  public itemSeparator: InputSignal<string> = input<string>(smallDot);
  // #endregion

  // #region Internal
  protected selectedItem: WritableSignal<string> = signal<string>("");
  // #endregion

  // #region Computes
  protected selectedItemIndex: Signal<number | null> = computed(() => {
    return getIndexByValue(this.itemList(), this.selectedItem());
  });

  protected containerClass: Signal<string> = computed<string>(() => {
    let className: string = "div-select-list";

    if (this.isDisabled()) {
      className += " div-disabled";
    }

    return className;
  });
  // #endregion

  // #region Select Item Control
  protected onSelectItem(item: string): void {
    if (this.isDisabled()) {
      return;
    }

    let newItem: string = item;
    if (item === this.selectedItem()) {
      newItem = "";
    }
    this.selectedItem.set(newItem);
    this.onChange(newItem);
  }
  // #endregion

  // #region ControlValueAccessor
  public registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  public writeValue(val: string): void {
    this.selectedItem.set(val);
  }
  // #endregion
}
