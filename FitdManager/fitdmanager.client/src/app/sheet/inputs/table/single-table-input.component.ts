import {
  Component, InputSignal, InputSignalWithTransform, OnChanges, OnInit, Signal, WritableSignal,
  booleanAttribute,
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
  public showControls: InputSignal<boolean> = input<boolean>(false);
  public customMaxItemWarning: InputSignal<string> = input<string>("");
  public customNonUniqueItemWarning: InputSignal<string> = input<string>("");
  public isEnforceUnique: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, { transform: booleanAttribute });
  // #endregion

  // #region Internals
  protected items: WritableSignal<string[]> = signal<string[]>([]);
  protected customItem: WritableSignal<string> = signal<string>("");

  // #region Warning Messages
  protected maxItemWarning: Signal<string> = computed<string>(() => {
    if (this.customMaxItemWarning() !== "") {
      return this.customMaxItemWarning();
    }

    // Default message
    return "Table is full. Remove items from the table to add more.";
  });

  protected nonUniqueItemWarning: Signal<string> = computed<string>(() => {
    if (this.customNonUniqueItemWarning() !== "") {
      return this.customNonUniqueItemWarning();
    }

    return `Item \'${this.customItem()}\' is already in the table.`;
  });
  // #endregion

  // #region Control Flags
  protected isCustomTextDisabled: Signal<boolean> = computed<boolean>(() => {
    return !this.canAddItem();
  });

  // #endregion

  // #region State Flags
  protected isTableFull: Signal<boolean> = computed<boolean>(() => {
    return this.items().length >= this.maxNbrOfItems();
  });

  protected canAddItem: Signal<boolean> = computed<boolean>(() => {
    return !(this.isDisabled() || this.isTableFull());
  });

  protected isCustomItemUnique: Signal<boolean> = computed <boolean>(() => {
    if (!this.isEnforceUnique()) {
      return true;
    }

    return this.isItemUnique(this.customItem());
  })
  // #endregion
  // #endregion

  protected shouldCreateHeader: Signal<boolean> = computed<boolean>(() => {
    return this.header() !== "";
  });

  protected shouldCreateFooter: Signal<boolean> = computed<boolean>(() => {
    return this.footer() !== "";
  });
  // #endregion

  // #region Lifecycle
  public ngOnChanges(): void {
    if (this.maxNbrOfItems() <= 0) {
      throw "maxNbrOfItems should be at least 1.";
    }

    if (this.items().length > this.maxNbrOfItems()) {
      throw `The length of items exceeds the maxNbrOfItems (${this.maxNbrOfItems()})`;
    }
  }
  // #endregion

  // #region Item Controls
  protected onAddCustomItem(): void {
    console.log("onAddCustomitem");
    if (!this.canAddItem()) {
      return;
    }

    if (this.isEnforceUnique() && !this.isItemUnique(this.customItem())) {
      return;
    }

    let newItemList: string[] = this.items().slice();
    newItemList.push(this.customItem());
    this.items.set(newItemList);

    this.customItem.set("");
  }

  protected onRemoveItem(index: number): void {
    console.log("onRemoveItem");
    if (this.isDisabled()) {
      return;
    }

    let newItemList: string[] = this.items().slice();
    newItemList.splice(index, 1);
    this.items.set(newItemList);
  }

  protected onChangeCustomItem(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    this.customItem.set(element.value);

  }

  protected isItemUnique(item: string): boolean {
    return this.items().find((x: string) => x === item) === undefined;
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
    this.items.set(val.slice());
  }
  // #endregion
}
