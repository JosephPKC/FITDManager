import {
  Component, InputSignal, InputSignalWithTransform, Signal, WritableSignal,
  booleanAttribute, computed, forwardRef, input, signal
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { BaseTableInputDirective } from "@sheet/inputs";

export interface TableParams {
  header: string;
  footer: string;
  name: string;
  maxSize: number;
  hideIfEmpty: boolean;
}

/**
 * Custom table input that allows the user to add custom items to the table.
 * It can have multiple different 'tables', each with their own header/footer and size.
 */
@Component({
  selector: "multi-table-input",
  templateUrl: "multi-table-input.component.html",
  styleUrl: "multi-table-input.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiTableInputComponent),
      multi: true
    }
  ],
  standalone: true
})
export class MultiTableInputComponent extends BaseTableInputDirective<string[][]> {
  // #region Inputs
  /**
   * Each table in this component MUST have a table param defined.
   */
  public tableParams: InputSignal<TableParams[]> = input.required<TableParams[]>();
  public placeholder: InputSignal<string> = input<string>("");
  public showControls: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, { transform: booleanAttribute });
  // #endregion

  // #region State
  protected tables: WritableSignal<string[][]> = signal<string[][]>([]);

  protected customItem: WritableSignal<string> = signal<string>("");
  /**
   * The table index number.
   * If it is negative, that means there is no table selected.
   */
  protected customTable: WritableSignal<number> = signal<number>(0);
  // #endregion

  // #region Computes
  protected nbrOfTables: Signal<number> = computed<number>(() => {
    return this.tableParams().length;
  })

  /**
   * Gets the first available table index number, or -1 if there is none.
   */
  protected firstAvailTable: Signal<number> = computed<number>(() => {
    return this.isTableAvailArr().findIndex((v: boolean, i: number, arr: boolean[]) => v === true);
  });

  // #region Computes for Template Display
  protected shouldCreateHeaderArr: Signal<boolean[]> = computed<boolean[]>(() => {
    let arr: boolean[] = new Array<boolean>(this.nbrOfTables());

    for (let i = 0; i < this.nbrOfTables(); i++) {
      arr[i] = this.tableParams()[i].header !== "";
    }

    return arr;
  });

  protected shouldCreateFooterArr: Signal<boolean[]> = computed<boolean[]>(() => {
    let arr: boolean[] = new Array<boolean>(this.nbrOfTables());

    for (let i = 0; i < this.nbrOfTables(); i++) {
      arr[i] = this.tableParams()[i].footer !== "";
    }

    return arr;
  });

  protected isTableAvailArr: Signal<boolean[]> = computed<boolean[]>(() => {
    let arr: boolean[] = new Array<boolean>(this.nbrOfTables());

    for (let i = 0; i < this.nbrOfTables(); i++) {
      arr[i] = this.tables()[i].length < this.tableParams()[i].maxSize;
    }

    return arr;
  });

  protected shouldShowTableArr: Signal<boolean[]> = computed<boolean[]>(() => {
    let arr: boolean[] = new Array<boolean>(this.nbrOfTables());

    for (let i = 0; i < this.nbrOfTables(); i++) {
      arr[i] = true;

      if (this.showControls()) {
        // When controls are shown, show all tables.
        continue;
      }

      if (this.tableParams()[i].hideIfEmpty) {
        arr[i] = this.tables()[i].length !== 0;
      }
    }

    return arr;
  });
  // #endregion
  // #endregion

  // #region Table Controls
  protected onAddCustomItem(): void {
    if (this.isDisabled()) {
      return;
    }

    if (this.customTable() < 0) {
      // A negative table means no table selected.
      return;
    }

    if (!this.isTableAvailArr()[this.customTable()]) {
      // Table is full (shouldn't really happen, as the UI should disable selecting a full table).
      return;
    }

    // Create a new table list, and add the custom item to it.
    let newTableList: string[][] = this.tables().map((arr: string[]) => arr.slice());
    newTableList[this.customTable()].push(this.customItem());

    this.tables.set(newTableList);
    this.onChange(this.tables());

    // Reset the custom item state
    this.customItem.set("");
    this.customTable.set(this.firstAvailTable());
  }

  protected onRemoveItem(tableIndex: number, itemIndex: number): void {
    if (this.isDisabled()) {
      return;
    }

    // Create a new table list, and remove the selected item from it.
    let newTableList: string[][] = this.tables().map((arr: string[]) => arr.slice());
    newTableList[tableIndex].splice(itemIndex, 1);

    this.tables.set(newTableList);
    this.onChange(this.tables());
  }
  // #endregion

  // #region Custom Item Controls
  protected onChangeCustomItem(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    this.customItem.set(element.value);
  }

  protected onChangeCustomTable(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    this.customTable.set(Number.parseInt(element.value));
  }
  // #endregion

  // #region Helpers
  protected validateNewTableSizes(newTables: string[][]): boolean {
    // Validate the # of tables
    if (newTables.length !== this.nbrOfTables()) {
      return false;
    }

    // Validate the items vs the table sizes
    for (let i = 0; i < this.nbrOfTables(); i++) {
      if (newTables[i].length > this.tableParams()[i].maxSize) {
        return false;
      }
    }

    return true;
  }
  // #endregion

  // #region BaseInputDirective
  public writeValue(val: string[][]): void {
    if (!this.validateNewTableSizes(val)) {
      throw `The value giving to the form control has invalid sizes. New value ${val}.`;
    }
    this.tables.set(val.map((arr: string[]) => arr.slice()));
  }
  // #endregion

}
