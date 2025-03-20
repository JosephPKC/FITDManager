import {
  Component, InputSignal, InputSignalWithTransform, Signal, WritableSignal,
  booleanAttribute, computed, forwardRef, input, signal
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { BaseTableInputDirective } from "@sheet/inputs";
import { ContactModel, ContactState } from "../../../games/bitd/models";

/**
 * Custom table input that allows the user to add custom items to the table.
 * It can have multiple different 'tables', each with their own header/footer and size.
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
export class SingleTableInputComponent extends BaseTableInputDirective<ContactModel[]> {
  // #region Inputs
  public header: InputSignal<string> = input<string>("");
  public footer: InputSignal<string> = input<string>("");
  public placeholder: InputSignal<string> = input<string>("");
  // #endregion

  // #region State
  protected items: WritableSignal<ContactModel[]> = signal<ContactModel[]>([]);

  protected customItem: WritableSignal<string> = signal<string>("");
  // #endregion

  // #region Computes
  protected shouldCreateHeader: Signal<boolean> = computed<boolean>(() => {
    return this.header() !== "";
  });

  protected shouldCreateFooter: Signal<boolean> = computed<boolean>(() => {
    return this.footer() !== "";
  });

  protected isContactAllyArr: Signal<boolean[]> = computed<boolean[]>(() => {
    return this.items().map((v, i, arr) => v.state === ContactState.ALLY);
  });

  protected isContactRivalArr: Signal<boolean[]> = computed<boolean[]>(() => {
    return this.items().map((v, i, arr) => v.state === ContactState.RIVAL);
  });

  protected contactNameArr: Signal<string[]> = computed<string[]>(() => {
    return this.items().map((v, i, arr) => {
      let state: string;
      switch (v.state) {
        case ContactState.ALLY: {
          state = "ALLY: ";
          break;
        }

        case ContactState.RIVAL: {
          state = "RIVAL: ";
          break;
        }

        default: {
          state = "";
          break;
        }
      }
      return `${state}${v.name}`;
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

    const newItemsList: ContactModel[] = this.deepCopyArr(this.items());
    const newContact: ContactModel = {
      name: this.customItem(),
      state: ContactState.NEUTRAL
    };
    newItemsList.push(newContact);

    this.items.set(newItemsList);
    this.onChange(this.items());

    this.customItem.set("");
  }

  protected onRemoveItem(index: number): void {
    if (this.isLocked()) {
      return;
    }

    const newItemsList: ContactModel[] = this.deepCopyArr(this.items());
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
  // #endregion

  protected onSelectAlly(index: number): void {
    if (this.isLocked()) {
      return;
    }

    const newItemsList: ContactModel[] = this.deepCopyArr(this.items());
    newItemsList[index].state = newItemsList[index].state === ContactState.ALLY ? ContactState.NEUTRAL : ContactState.ALLY;

    this.items.set(newItemsList);
    this.onChange(this.items());
  }

  protected onSelectRival(index: number): void {
    if (this.isLocked()) {
      return;
    }

    const newItemsList: ContactModel[] = this.deepCopyArr(this.items());
    newItemsList[index].state = newItemsList[index].state === ContactState.RIVAL ? ContactState.NEUTRAL : ContactState.RIVAL;

    this.items.set(newItemsList);
    this.onChange(this.items());
  }

  // #region BaseInputDirective
  public writeValue(val: ContactModel[]): void {
    this.items.set(this.deepCopyArr(val));
  }
  // #endregion

  protected deepCopyArr(arr: ContactModel[]): ContactModel[] {
    return arr.map((v, i, arr) => {
      return {
        name: v.name,
        state: v.state
      };
    });
  }
}
