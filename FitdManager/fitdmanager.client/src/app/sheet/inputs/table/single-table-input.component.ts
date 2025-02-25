import {
  Component, InputSignal, InputSignalWithTransform, OnChanges, OnInit, Signal, WritableSignal,
  computed, forwardRef, input, numberAttribute, signal
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { BaseTableInputDirective } from "./base-table-input.directive";

/**
 * Table input that has a single column/row.
 */
@Component({
  selector: "single-table-input",
  templateUrl: "single-table-input.component.html",
  styleUrl: "single-table-input.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleTableInputComponent),
      multi: true
    }
  ],
  standalone: true
})
export class SingleTableInputComponent extends BaseTableInputDirective<string[]> implements ControlValueAccessor, OnChanges {
  // #region Params
  public header: InputSignal<string> = input<string>("");
  public footer: InputSignal<string> = input<string>("");
  public maxNbrOfItems: InputSignalWithTransform<number, unknown> = input<number, unknown>(1, { transform: numberAttribute });
  // #endregion

  // #region Internals
  protected tableItems: WritableSignal<string[]> = signal<string[]>([]);
  protected isTableFull: Signal<boolean> = computed<boolean>(() => {
    return this.tableItems().length >= this.maxNbrOfItems();
  });

  protected canAddItem: Signal<boolean> = computed<boolean>(() => {
    return !(this.isDisabled() || this.isTableFull());
  });
  // #endregion

  // #region Lifecycle
  public ngOnChanges(): void {
    if (this.maxNbrOfItems() <= 0) {
      throw "maxNbrOfItems should be at least 1.";
    }

    if (this.tableItems().length > this.maxNbrOfItems()) {
      throw `The length of items exceeds the maxNbrOfItems (${this.maxNbrOfItems()})`;
    }

    this.tableItems.set(new Array<string>(this.maxNbrOfItems()).fill(""));
  }
  // #endregion

  // #region Item Controls
  protected onAddItem(item: string): void {
    if (!this.canAddItem()) {
      return;
    }

    let newItemList: string[] = this.tableItems().slice();
    newItemList.push(item);
    this.tableItems.set(newItemList);
  }

  protected onRemoveItem(index: number): void {
    if (this.isDisabled()) {
      return;
    }

    let newItemList: string[] = this.tableItems().slice();
    newItemList.splice(index, 1);
    this.tableItems.set(newItemList);
  }
  // #endregion

  // #region ControlValueAccessor
  public registerOnChange(onChange: (value: string[]) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  public writeValue(val: string[]): void {
    this.tableItems.set(val.slice());
  }
  // #endregion
}
