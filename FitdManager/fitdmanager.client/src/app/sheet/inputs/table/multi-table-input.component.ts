import {
  Component, InputSignal, InputSignalWithTransform, Signal, SimpleChanges, WritableSignal,
  booleanAttribute, computed, forwardRef, input, numberAttribute, signal
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { BaseTableInputDirective } from "./base-table-input.directive";



export interface TableParams {
  header: string;
  footer: string;
  name: string;
  maxNbrOfItems: number;
  enforceUnique: boolean;
}

export interface Table {
  items: string[];
}

interface CustomItem {
  item: string;
  tableNbr: number;
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
  public placeholder: InputSignal<string> = input<string>("");
  public tableParams: InputSignal<TableParams[]> = input.required<TableParams[]>();
  public showControls: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, { transform: booleanAttribute });
  // #endregion

  // #region State
  protected tables: WritableSignal<string[][]> = signal<string[][]>([]);
  // Maybe do self validation for these signals
  protected customItem: WritableSignal<string> = signal<string>("");
  protected customItemTableIndex: WritableSignal<number | null> = signal<number | null>(0);
  // #endregion

  // #region Computes
  protected nbrOfTables: Signal<number> = computed<number>(() => {
    console.log(`nbr of tables: ${this.tableParams().length}`);
    return this.tableParams().length;
  })

  protected headerCreationArray: Signal<boolean[]> = computed<boolean[]>(() => {
    let headerArr: boolean[] = new Array<boolean>(this.nbrOfTables());

    for (let i = 0; i < this.nbrOfTables(); i++) {
      headerArr[i] = this.tableParams()[i].header !== "";
    }

    return headerArr;
  });

  protected footerCreationArray: Signal<boolean[]> = computed<boolean[]>(() => {
    let footerArr: boolean[] = new Array<boolean>(this.nbrOfTables());

    for (let i = 0; i < this.nbrOfTables(); i++) {
      footerArr[i] = this.tableParams()[i].footer !== "";
    }

    return footerArr;
  });

  protected tableAvailArray: Signal<boolean[]> = computed<boolean[]>(() => {
    let arr: boolean[] = new Array<boolean>(this.nbrOfTables());

    for (let i = 0; i < this.nbrOfTables(); i++) {
      arr[i] = this.tables()[i].length < this.tableParams()[i].maxNbrOfItems;
    }

    return arr;
  });

  protected firstAvailTable: Signal<number | null> = computed<number | null>(() => {
    const firstAvail: number = this.tableAvailArray().findIndex((v: boolean, i: number, arr: boolean[]) => v === true);
    return firstAvail >= 0 ? firstAvail : null;
  });

  protected isCustomTextDisabled: Signal<boolean> = computed<boolean>(() => {
    return false;
  });

  protected doesTableHaveSpaceForCustomItem: Signal<boolean> = computed<boolean>(() => {
    if (this.customItemTableIndex() === null) {
      return false;
    }
    console.log(`Custom Index: ${this.customItemTableIndex()}`);

    const params: TableParams = this.tableParams()[this.customItemTableIndex()!];
    const table: string[] = this.tables()[this.customItemTableIndex()!];

    console.log(`${table.length} vs ${params.maxNbrOfItems}`);
    return table.length < params.maxNbrOfItems;
  })

  protected isCustomItemUnique: Signal<boolean> = computed<boolean>(() => {
    if (this.customItemTableIndex() === null) {
      return true;
    }

    return this.isItemUnique(this.customItemTableIndex()!, this.customItem());
  });
  // #endregion

  // #region Flags

  // #endregion

  //public constructor() {
  //  super();

  //  const arr: string[][] = new Array<string[]>(this.nbrOfTables());
  //  for (let i = 0; i < arr.length; i++) {
  //    arr[i] = new Array<string>(this.tableParams()[i].maxNbrOfItems);
  //  }
  //  this.tables.set(arr);
  //}

  // #region Lifecycle
  protected override validateInputChanges(changes: SimpleChanges): void {
    console.log(`TABLES: ${this.tables()}`);
    //if (this.nbrOfTables() <= 0) {
    //  throw "Input 'tableParams' has incorrect length.";
    //}

    //for (let i = 0; i < this.nbrOfTables(); i++) {
    //  if (this.tables()[i].length > this.tableParams()[i].maxNbrOfItems) {
    //    throw `The length of items exceeds the maxNbrOfItems (${this.tableParams()[i].maxNbrOfItems})`;
    //  }
    //}
  }
  // #endregion

  // #region Item Controls
  protected onAddCustomItem(): void {
    console.log(`onAddCustomItem: ${this.customItem()} @ ${this.customItemTableIndex()}`);
    if (this.isDisabled()) {
      return;
    }

    if (this.customItemTableIndex() === null) {
      return;
    }

    const params: TableParams = this.tableParams()[this.customItemTableIndex()!];
    const table: string[] = this.tables()[this.customItemTableIndex()!];

    // Check if table is full
    if (table.length >= params.maxNbrOfItems) {
      return;
    }

    // Check if item is unique
    if (params.enforceUnique && !this.isItemUnique(this.customItemTableIndex()!, this.customItem())) {
      return;
    }

    // Copy the existing table, then add the custom item to it.
    let newTableList: string[][] = this.tables().map((arr: string[]) => arr.slice());
    newTableList[this.customItemTableIndex()!].push(this.customItem());
    this.tables.set(newTableList);
    this.onChange(this.tables());

    this.customItem.set("");
    this.customItemTableIndex.set(this.firstAvailTable());
  }

  protected onRemoveItem(tableIndex: number, itemIndex: number): void {
    console.log(`OnRemoveItem: ${tableIndex}, ${itemIndex}`);
    if (this.isDisabled()) {
      return;
    }

    let newTableList: string[][] = this.tables().map((arr: string[]) => arr.slice());
    newTableList[tableIndex].splice(itemIndex, 1);
    this.tables.set(newTableList);
    this.onChange(this.tables());
  }

  protected onChangeCustomItem(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    this.customItem.set(element.value);
  }

  protected onChangeCustomItemTable(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    this.customItemTableIndex.set(Number.parseInt(element.value));
  }

  protected isItemUnique(tableIndex: number, item: string): boolean {
    const items: string[] = this.tables()[tableIndex];
    return items.find((x: string) => x === item) === undefined;
  }
  // #endregion

  // #region BaseInpurDirective
  public writeValue(val: string[][]): void {
    this.tables.set(val.map((arr: string[]) => arr.slice()));
  }
  // #endregion
}
