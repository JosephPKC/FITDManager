import {
  Component, Signal, WritableSignal,
  computed, forwardRef, signal
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

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
export class TextInputComponent extends BaseInputDirective<string>{
  // #region State
  protected text: WritableSignal<string> = signal<string>("");
  // #endregion

  // #region Computes
  protected inputClass: Signal<string> = computed<string>(() => {
    let inpClass: string = "inp-text inp-underline-text";

    if (this.isLocked()) {
      inpClass += " inp-disabled";
    }

    return inpClass;
  });
  // #endregion

  // #region Change Text Control
  public onChangeText(event: Event): void {
    if (this.isLocked()) {
      return;
    }

    const element: HTMLInputElement = event.target as HTMLInputElement;

    this.text.set(element.value);
    this.onChange(element.value);
  }
  // #endregion

  // #region BaseInputDirective
  public writeValue(val: string): void {
    this.text.set(val);
  }
  // #endregion
}
