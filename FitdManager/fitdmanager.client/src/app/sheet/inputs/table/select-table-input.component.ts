import {
  Component, InputSignal, InputSignalWithTransform, Signal, WritableSignal,
  booleanAttribute, computed, forwardRef, input, signal
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { BaseTableInputDirective } from "@sheet/inputs";

/**
 * Custom table input that supports a single table.
 * Users can add items to the table via a select dropdown.
 */
@Component({
  selector: "select-table-input",
  templateUrl: "select-table-input.component.html",
  styleUrl: "select-table-input.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectTableInputComponent),
      multi: true
    }
  ],
  standalone: true
})
export class SelectTableInputComponent extends BaseTableInputDirective<string[]> {
  // #region Inputs
  public header: InputSignal<string> = input<string>("");
  public footer: InputSignal<string> = input<string>("");
  public itemsToAdd: InputSignal<string[]> = input<string[]>([]);
  // #endregion

  // #region State
  protected items: WritableSignal<string[]> = signal<string[]>([]);

  protected selectedItemIndex: WritableSignal<number> = signal<number>(-1);

  protected customItemName: WritableSignal<string> = signal<string>("");
  protected customItemDesc: WritableSignal<string> = signal<string>("");
  // #endregion

  // #region Computes
  protected shouldCreateHeader: Signal<boolean> = computed<boolean>(() => {
    return this.header() !== "";
  });

  protected shouldCreateFooter: Signal<boolean> = computed<boolean>(() => {
    return this.footer() !== "";
  });

  protected nbrOfItemsToAdd: Signal<number> = computed<number>(() => {
    return this.itemsToAdd().length;
  });

  /**
 * Gets the first available option index number, or -1 if there is none.
 */
  protected firstAvailOpt: Signal<number> = computed<number>(() => {
    return this.isOptAvailArr().findIndex((v: boolean, i: number, arr: boolean[]) => v === true);
  });

  protected isDefaultOptSelected: Signal<boolean> = computed<boolean>(() => {
    return this.selectedItemIndex() < 0;
  });

  protected isOptAvailArr: Signal<boolean[]> = computed<boolean[]>(() => {
    const arr: boolean[] = new Array<boolean>(this.nbrOfItemsToAdd());

    for (let i = 0; i < this.nbrOfItemsToAdd(); i++) {
      // If item is found in the items() list, then it is unavailable
      const itemToAdd: string = this.itemsToAdd()[i];
      const found: string | undefined = this.items().find((v: string, i: number, arr: string[]) => v === itemToAdd );
      arr[i] = found === undefined;
    }

    return arr;
  });

  protected isOptSelectedArr: Signal<boolean[]> = computed<boolean[]>(() => {
    const arr: boolean[] = new Array<boolean>(this.nbrOfItemsToAdd()).fill(false);

    if (this.selectedItemIndex() >= 0) {
      arr[this.selectedItemIndex()] = true;
    }

    return arr;
  });

  /**
 * This will be the warning message that shows when the user hovers over the 'Add' button.
 */
  protected btnWarnTooltip: Signal<string> = computed<string>(() => {
    let tooltip: string = "";
    if (this.selectedItemIndex() < 0) {
      if (this.customItemName() === "") {
        tooltip += "Name is blank.";
      }

      if (this.customItemDesc() === "") {
        tooltip += "Desc is blank.";
      }
    }

    return tooltip;
  });

  protected shouldShowWarnTooltip: Signal<boolean> = computed<boolean>(() => {
    return this.btnWarnTooltip() !== "";
  });

  protected shouldShowCustomItem: Signal<boolean> = computed<boolean>(() => {
    // Custom item workflow should only show if Custom is selected.
    return this.selectedItemIndex() === -1;
  })
  // #endregion

  // #region Table Controls
  protected onAddItem(): void {
    if (this.isLocked()) {
      return;
    }

    let itemToAdd: string;
    if (this.selectedItemIndex() < 0) {
      // Custom item instead
      if (this.customItemName() === "" || this.customItemDesc() === "") {
        return;
      }

      itemToAdd = `${this.customItemName()} - ${this.customItemDesc()}`;
      this.customItemName.set("");
      this.customItemDesc.set("");
    }
    else {
      itemToAdd = this.itemsToAdd()[this.selectedItemIndex()];
    }

    const newItemsList: string[] = this.items().slice();
    newItemsList.push(itemToAdd);

    this.items.set(newItemsList);
    this.onChange(this.items());

    this.selectedItemIndex.set(this.firstAvailOpt());
  }

  protected onRemoveItem(index: number): void {
    if (this.isLocked()) {
      return;
    }

    const newItemsList: string[] = this.items().slice();
    newItemsList.splice(index, 1);

    this.items.set(newItemsList);
    this.onChange(this.items());
  }
  // #endregion

  // #region Add Item Controls
  protected onItemSelectChange(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    this.selectedItemIndex.set(Number.parseInt(element.value));
  }

  protected onChangeCustomItemName(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    this.customItemName.set(element.value);
  }

  protected onChangeCustomItemDesc(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    this.customItemDesc.set(element.value);
  }
  // #endregion

  // #region BaseInputDirective
  public writeValue(val: string[]): void {
    this.items.set(val.slice());
  }
  // #endregion

}
