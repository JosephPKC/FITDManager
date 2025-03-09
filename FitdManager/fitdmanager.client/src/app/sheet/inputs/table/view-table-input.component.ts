import {
  Component, InputSignal, Signal, WritableSignal,
  computed, forwardRef, input, signal
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { BaseTableInputDirective } from "./base-table-input.directive";
import { BaseInputDirective } from "../base-input.directive";

/**
 * Table input that only displays its contents.
 * The user has no direct ability to change the contents within this input.
 */
@Component({
  selector: "view-table-input",
  templateUrl: "view-table-input.component.html",
  styleUrl: "view-table-input.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ViewTableInputComponent),
      multi: true
    }
  ],
  standalone: true
})
export class ViewTableInputComponent extends BaseInputDirective<string[]> {
  // #region Inputs
  public header: InputSignal<string> = input<string>("");
  public footer: InputSignal<string> = input<string>("");
  public enforceUnique: InputSignal<boolean> = input<boolean>(false);
  // #endregion

  // #region State
  protected items: WritableSignal<string[]> = signal<string[]>([]);
  // #endregion

  // #region Computes
  protected shouldCreateHeader: Signal<boolean> = computed<boolean>(() => {
    return this.header() !== "";
  });

  protected shouldCreateFooter: Signal<boolean> = computed<boolean>(() => {
    return this.footer() !== "";
  });


  // #endregion

  // #region BaseInputDirective
  public override writeValue(val: string[]): void {
    this.items.set(val.slice());
  }
  // #endregion
}
