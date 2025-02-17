import { Component, InputSignal, OnInit, OutputEmitterRef, Signal, WritableSignal, computed, input, output, signal } from "@angular/core";

@Component({
  selector: 'sheet-text-field',
  templateUrl: './sheet-text-field.component.html',
  styleUrl: './sheet-text-field.component.scss',
  standalone: true
})
export class SheetTextFieldComponent implements OnInit {
  // #region Inputs
  public fieldName: InputSignal<string> = input<string>('');
  public labelText: InputSignal<string> = input<string>(''); 
  public initValue: InputSignal<string> = input<string>('');
  public formControlName: InputSignal<string> = input<string>('');
  // #endregion

  // #region Outputs
  public fieldValueChange: OutputEmitterRef<string> = output();
  // #endregion

  // #region Signals
  public inputIdName: Signal<string> = computed(() => `div-${this.fieldName()}`);
  public value: WritableSignal<string> = signal('');
  // #endregion

  constructor() { }

  public ngOnInit(): void {
    console.log(`Setting init value: ${this.initValue()}`);
    this.value.set(this.initValue());
  }

  public onTextChange(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const textValue: string = element.value;

    this.value.set(textValue);
    this.fieldValueChange.emit(this.value());
  }
}
