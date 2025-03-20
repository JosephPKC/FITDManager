import {
  Component, InputSignal, InputSignalWithTransform, OutputEmitterRef, Signal, WritableSignal,
  booleanAttribute, computed, forwardRef, input, output, signal
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { BaseTableInputDirective } from "@sheet/inputs";
import { ContactModel, ContactState } from "../../../games/bitd/models";
import { ItemModel } from "../../../games/bitd/models/bitd-char-item.model";

/**
 * Custom table input that allows the user to add custom items to the table.
 * It can have multiple different 'tables', each with their own header/footer and size.
 */
@Component({
  selector: "add-table-input",
  templateUrl: "add-table-input.component.html",
  styleUrl: "add-table-input.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddTableInputComponent),
      multi: true
    }
  ],
  standalone: true
})
export class AddTableInputComponent extends BaseTableInputDirective<ItemModel[]> {
  // #region Inputs
  public header: InputSignal<string> = input<string>("");
  public footer: InputSignal<string> = input<string>("");
  public placeholder: InputSignal<string> = input<string>("");
  public allowAdd: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(true, { transform: booleanAttribute });
  // #endregion

  // #region Outputs
  public onItemClick: OutputEmitterRef<ItemModel> = output<ItemModel>();
  // #endregion

  // #region State
  protected items: WritableSignal<ItemModel[]> = signal<ItemModel[]>([]);

  protected customItem: WritableSignal<string> = signal<string>("");
  protected customBoxes: WritableSignal<number> = signal<number>(0);
  // #endregion

  // #region Computes
  protected shouldCreateHeader: Signal<boolean> = computed<boolean>(() => {
    return this.header() !== "";
  });

  protected shouldCreateFooter: Signal<boolean> = computed<boolean>(() => {
    return this.footer() !== "";
  });

  protected itemNameArr: Signal<string[]> = computed<string[]>(() => {
    return this.items().map((v, i, arr) => {
      return `${v.boxes} ${v.name}`;
    });
  });


  /**
 * This will be the warning message that shows when the user hovers over the 'Add' button.
 */
  protected btnWarnTooltip: Signal<string> = computed<string>(() => {
    let tooltip: string = "";
    if (this.customItem() === "") {
      tooltip += "Name is blank.";
    }

    return tooltip;
  });

  protected shouldShowWarnTooltip: Signal<boolean> = computed<boolean>(() => {
    return this.btnWarnTooltip() !== "";
  });
  // #endregion

  // #region Table Controls
  protected onAddItem(): void {
    if (this.isLocked()) {
      return;
    }

    const newItemsList: ItemModel[] = this.deepCopyArr(this.items());
    const newItem: ItemModel = {
      name: this.customItem(),
      boxes: this.customBoxes()
    };
    newItemsList.push(newItem);

    this.items.set(newItemsList);
    this.onChange(this.items());

    this.customItem.set("");
    this.customBoxes.set(0);
  }

  protected onRemoveItem(index: number): void {
    if (this.isLocked()) {
      return;
    }

    const newItemsList: ItemModel[] = this.deepCopyArr(this.items());
    newItemsList.splice(index, 1);

    this.items.set(newItemsList);
    this.onChange(this.items());
  }
  // #endregion

  // #region Add Item Controls
  protected onChangeCustomItem(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    this.customItem.set(element.value);
  }

  protected onChangeCustomBoxes(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    this.customBoxes.set(Number.parseInt(element.value))
  }
  // #endregion

  protected onTableItemClick(index: number): void {
    this.onItemClick.emit(this.items()[index]);
  }

  // #region BaseInputDirective
  public writeValue(val: ItemModel[]): void {
    this.items.set(this.deepCopyArr(val));
  }
  // #endregion

  protected deepCopyArr(arr: ItemModel[]): ItemModel[] {
    return arr.map((v, i, arr) => {
      return {
        name: v.name,
        boxes: v.boxes
      };
    });
  }
}
