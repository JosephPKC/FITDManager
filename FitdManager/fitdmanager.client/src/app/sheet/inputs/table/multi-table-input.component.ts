//import {
//  Component, InputSignal, InputSignalWithTransform, OnChanges, OnInit, Signal, WritableSignal,
//  booleanAttribute,
//  computed, forwardRef, input, numberAttribute, signal
//} from "@angular/core";
//import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

//import { BaseTableInputDirective } from "./base-table-input.directive";

//export interface TableParams {
//  header: string;
//  footer: string;
//  maxNbrOfItems: number;
//}
///**
// * Table input that has multiple columns/rows.
// * Think of it like a table of tables, or a jagged matrix.
// * The outer layer is the nbr of tables/columns, and the inner layer is the number of items. Each table/column has its own set of items and size, making it jagged.
// */
//@Component({
//  selector: "multi-table-input",
//  templateUrl: "multi-table-input.component.html",
//  styleUrl: "multi-table-input.component.scss",
//  providers: [
//    {
//      provide: NG_VALUE_ACCESSOR,
//      useExisting: forwardRef(() => MultiTableInputComponent),
//      multi: true
//    }
//  ],
//  standalone: true
//})
//export class MultiTableInputComponent extends BaseTableInputDirective<string[]> implements ControlValueAccessor, OnChanges {
//  // #region Params
//  public nbrOfTables: InputSignalWithTransform<number, unknown> = input<number, unknown>(1, { transform: numberAttribute });
//  public tableParams: InputSignal<TableParams[]> = input.required<TableParams[]>();

//  public showControls: InputSignal<boolean> = input<boolean>(false);
//  public customMaxItemWarning: InputSignal<string> = input<string>("");
//  public customNonUniqueItemWarning: InputSignal<string> = input<string>("");
//  public isEnforceUnique: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, { transform: booleanAttribute });
//  // #endregion

//  // #region Internals
//  // Outer is the table nbr/level; Inner is the item nbr.
//  protected items: WritableSignal<string[][]> = signal<string[][]>([]);
//  protected customItem: WritableSignal<string> = signal<string>("");
//  protected customItemLevel: WritableSignal<number> = signal<number>(0);

//  // #region Warning Messages
//  protected maxItemWarning: Signal<string> = computed<string>(() => {
//    if (this.customMaxItemWarning() !== "") {
//      return this.customMaxItemWarning();
//    }

//    // Default message
//    return `Table ${this.customItemLevel} is full. Remove items from the table to add more.`;
//  });

//  protected nonUniqueItemWarning: Signal<string> = computed<string>(() => {
//    if (this.customNonUniqueItemWarning() !== "") {
//      return this.customNonUniqueItemWarning();
//    }

//    return `Item \'${this.customItem()}\' is already in the table ${this.customItemLevel}.`;
//  });
//  // #endregion

//  // #region Control Flags
//  protected isCustomTextDisabled: Signal<boolean> = computed<boolean>(() => {
//    // Disable custom text, if the input is disabled OR if every table is full
//    return this.isDisabled() || this.isTableFull().every((v: boolean, i: number, arr: boolean[]) => v);
//  });

//  // #endregion

//  // #region State Flags
//  protected isTableFull: Signal<boolean[]> = computed<boolean[]>(() => {
//    let fullArr: boolean[] = new Array<boolean>(this.nbrOfTables());
//    for (let i = 0; i < fullArr.length; i++) {
//      fullArr[i] = this.items()[i].length >= this.tableParams()[i].maxNbrOfItems;
//    }

//    return fullArr;
//  });

//  protected canAddItem: Signal<boolean[]> = computed<boolean[]>(() => {
//    if (this.isDisabled()) {
//      return new Array<;
//    }

//    return !(this.isDisabled() || this.isTableFull());
//  });

//  protected isCustomItemUnique: Signal<boolean> = computed<boolean>(() => {
//    if (!this.isEnforceUnique()) {
//      return true;
//    }

//    return this.isItemUnique(this.customItem());
//  })
//  // #endregion
//  // #endregion

//  protected shouldCreateHeader: Signal<boolean> = computed<boolean>(() => {
//    return this.header() !== "";
//  });

//  protected shouldCreateFooter: Signal<boolean> = computed<boolean>(() => {
//    return this.footer() !== "";
//  });
//  // #endregion

//  // #region Lifecycle
//  public ngOnChanges(): void {
//    if (this.maxNbrOfItems() <= 0) {
//      throw "maxNbrOfItems should be at least 1.";
//    }

//    if (this.items().length > this.maxNbrOfItems()) {
//      throw `The length of items exceeds the maxNbrOfItems (${this.maxNbrOfItems()})`;
//    }
//  }
//  // #endregion

//  // #region Item Controls
//  protected onAddCustomItem(): void {
//    console.log("onAddCustomitem");
//    if (!this.canAddItem()) {
//      return;
//    }

//    if (this.isEnforceUnique() && !this.isItemUnique(this.customItem())) {
//      return;
//    }

//    let newItemList: string[] = this.items().slice();
//    newItemList.push(this.customItem());
//    this.items.set(newItemList);
//    this.onChange(this.items());

//    this.customItem.set("");
//  }

//  protected onRemoveItem(index: number): void {
//    console.log("onRemoveItem");
//    if (this.isDisabled()) {
//      return;
//    }

//    let newItemList: string[] = this.items().slice();
//    newItemList.splice(index, 1);
//    this.items.set(newItemList);
//    this.onChange(this.items());
//  }

//  protected onChangeCustomItem(event: Event): void {
//    const element: HTMLInputElement = event.target as HTMLInputElement;
//    this.customItem.set(element.value);
//  }

//  protected isItemUnique(item: string): boolean {
//    return this.items().find((x: string) => x === item) === undefined;
//  }
//  // #endregion

//  // #region ControlValueAccessor
//  public registerOnChange(onChange: (value: string[]) => void): void {
//    this.onChange = onChange;
//  }

//  public registerOnTouched(onTouch: () => void): void {
//    this.onTouch = onTouch;
//  }

//  public setDisabledState(isDisabled: boolean): void {
//    this.isDisabled.set(isDisabled);
//  }

//  public writeValue(val: string[]): void {
//    this.items.set(val.slice());
//  }
//  // #endregion
//}
