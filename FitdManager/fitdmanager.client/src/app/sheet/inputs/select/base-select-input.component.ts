import {
  Component, InputSignal, InputSignalWithTransform, Signal,
  booleanAttribute, computed, input
} from "@angular/core";

import { smallDot } from "@shared/utils";
import { BaseInputDirective } from "@sheet/inputs";

/**
 * Base selection input.
 * Think of it as a dropdown-list, with all of its options exposed in a line.
 */
@Component({
  selector: "base-select-input",
  templateUrl: "base-select-input.component.html",
  styleUrl: "base-select-input.component.scss",
  standalone: true
})
export abstract class BaseSelectInputComponent<TValue> extends BaseInputDirective<TValue> {
  // #region Inputs
  public itemList: InputSignal<string[]> = input<string[]>([]);
  public itemSeparator: InputSignal<string> = input<string>(smallDot);
  public isVertical: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, { transform: booleanAttribute });
  // #endregion

  // #region Computes
  protected itemClasses: Signal<string[]> = computed<string[]>(() => {
    // Prefill with the default class.
    const classList: string[] = new Array<string>(this.nbrOfItems()).fill("btn-select-item");

    for (let i = 0; i < this.nbrOfItems(); i++) {
      if (this.isItemSelected(i)) {
        classList[i] += " select-item-selected";
      }
    }

    return classList;
  });

  protected containerClass: Signal<string> = computed<string>(() => {
    let className: string = "div-select-list";

    if (this.isVertical()) {
      className += " div-select-vertical";
    }
    else {
      className += " div-select-horizontal";
    }

    if (this.isDisabled()) {
      className += " div-disabled";
    }

    return className;
  });

  protected nbrOfItems: Signal<number> = computed<number>(() => {
    return this.itemList().length;
  });
  // #endregion

  // #region Abstracts
  protected abstract isItemSelected(index: number): boolean;
  protected abstract changeItemSelection(index: number): void;
  // #endregion

  // #region Select Item Control
  protected onSelectItem(index: number): void {
    if (this.isDisabled()) {
      return;
    }

    this.changeItemSelection(index);
  }
  // #endregion
}
