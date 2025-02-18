import {
  Directive, InputSignal, Signal, WritableSignal,
  computed, input, signal
} from "@angular/core";

import { noop } from "rxjs";

/**
 * Base for custom inputs for forms.
 */
@Directive({
  selector: "base-input"
})
export abstract class BaseInputDirective {
  // #region Params
  public label: InputSignal<string> = input<string>("");
  public customClass: InputSignal<string> = input<string>("");
  // #endregion

  // #region Internal
  protected isDisabled: WritableSignal<boolean> = signal<boolean>(false);
  protected onChange: (value: string) => void = noop;
  protected onTouch: () => void = noop;

  protected fullClass: Signal<string> = computed(() => {
    return "div-input " + this.customClass();
  });

  protected shouldCreateLabel: Signal<boolean> = computed<boolean>(() => {
    return this.label() !== null || this.label() !== undefined || this.label() !== "";
  });
  // #endregion
}
