import {
  Directive, InputSignal, InputSignalWithTransform, OnChanges, Signal, SimpleChanges, WritableSignal,
  booleanAttribute, computed, input, linkedSignal, signal
} from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

import { noop } from "rxjs";

/**
 * Base for custom inputs for forms.
 */
@Directive({
  selector: "base-input"
})
export abstract class BaseInputDirective<TValue> implements ControlValueAccessor, OnChanges {
  // #region Inputs
  public label: InputSignal<string> = input<string>("");
  public customClass: InputSignal<string> = input<string>("");
  /**
   * The parent can dictate whether 'controls' can be shown, whatever that may mean.
   */
  public locked: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(true, { transform: booleanAttribute });
  // #endregion

  // #region State
  /**
   * This is when the form control is disabled.
   */
  protected isDisabled: WritableSignal<boolean> = signal<boolean>(false);
  protected onChange: (value: TValue) => void = noop;
  protected onTouch: () => void = noop;
  // #endregion

  // #region Computes
  protected fullClass: Signal<string> = computed(() => {
    return "div-input " + this.customClass();
  });

  protected isLocked: WritableSignal<boolean> = linkedSignal<boolean>(() => {
    return this.locked() || this.isDisabled();
  });

  protected shouldCreateLabel: Signal<boolean> = computed<boolean>(() => {
    return this.label() !== null || this.label() !== undefined || this.label() !== "";
  });
  // #endregion

  // #region Lifecycle
  public ngOnChanges(changes: SimpleChanges): void {
    this.validateInputChanges(changes);
  }
  // #endregion

  protected validateInputChanges(changes: SimpleChanges): void {

  }

  // #region ControlValueAccessor
  public registerOnChange(onChange: (value: TValue) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  public abstract writeValue(val: TValue): void;
  // #endregion
}
