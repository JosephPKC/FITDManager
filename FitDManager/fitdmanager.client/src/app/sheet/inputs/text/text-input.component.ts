import {
  Component, WritableSignal,
  forwardRef, signal
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { BaseInputDirective } from "@sheet/inputs";

/**
 * Simple text input.
 */
@Component({
  selector: "text-input",
  templateUrl: "text-input.component.html",
  styleUrl: "text-input.component.scss",
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
  // #region Internals
  protected text: WritableSignal<string> = signal<string>("");
  // #endregion

  // #region Change Text Control
  public onChangeText(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;

    this.text.set(element.value);
    this.onChange(element.value);
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
    this.isDisabled.set(isDisabled);
  }

  public writeValue(val: string): void {
    this.text.set(val);
  }
  // #endregion
}
