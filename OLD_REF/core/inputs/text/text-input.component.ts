// Core
import { Component, InputSignal, forwardRef, input } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { noop } from "rxjs";

// App
import { BaseInputDirective } from "../base-input.directive";

/*
Simple text input.
*/
@Component({
  selector: 'text-input',
  templateUrl: 'text-input.component.html',
  styleUrl: 'text-input.component.scss',
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ],
  standalone: true
})
export class TextInputComponent extends BaseInputDirective implements ControlValueAccessor {
  // #region Inputs
  public initValue: InputSignal<string> = input<string>('');
  // #endregion

  // #region State
  protected onChange: (value: string) => void = noop;
  protected onTouch: () => void = noop;
  protected value: string = '';
  // #endregion

  // #region Lifecycle
  public override ngOnInit(): void {
    super.ngOnInit();
    this.value = this.initValue();
  }
  // #endregion

  // #region ControlValueAccessor
  public registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public writeValue(val: string): void {
    this.value = val;
  }
  // #endregion

  // #region Controls
  public onChangeText(value: string): void {
    if (this.isDisabled) {
      return;
    }

    this.onChange(value);
  }

  public onResetToDefault(): void {
    console.log(`Resetting to Default in input.`)
    this.value = this.initValue();
    this.onChange(this.value);
  }
  // #endregion
}
