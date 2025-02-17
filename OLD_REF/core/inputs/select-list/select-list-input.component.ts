// Core
import { Component, InputSignal, Signal, computed, forwardRef, input } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { noop } from "rxjs";

// App
import { BaseInputDirective } from "../base-input.directive";

/*
Simple text input.
*/
@Component({
  selector: 'select-list-input',
  templateUrl: 'select-list-input.component.html',
  styleUrl: 'select-list-input.component.scss',
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectListInputComponent),
      multi: true
    }
  ],
  standalone: true
})
export class SelectListInputComponent extends BaseInputDirective implements ControlValueAccessor {
  // #region Inputs
  public initSelection: InputSignal<string> = input<string>('');
  public selectionList: InputSignal<string[]> = input<string[]>([]);
  // #endregion

  // #region State
  public initSelectionIndex: Signal<number | null> = computed(() => {
    let index: number = this.selectionList().indexOf(this.initSelection());
    return index >= 0 ? index : null;
  });

  protected onChange: (index: number | null) => void = noop;
  protected onTouch: () => void = noop;

  private _index: number | null = null;
  protected get index(): number | null {
    return this._index;
  }

  protected set index(val: number | null) {
    // Quietly set an invalid index to null.
    if (val === null) {
      this._index = null;
    }
    else {
      this._index = this.isIndexValid(val) ? val : null;
    }
  }
  // #endregion

  // #region Lifecycle
  public override ngOnInit(): void {
    super.ngOnInit();

    this.index = this.initSelectionIndex();
  }
  // #endregion

  // #region ControlValueAccessor
  public registerOnChange(onChange: (value: number | null) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public writeValue(val: number | null): void {
    this.index = val;
  }
  // #endregion

  // #region Controls
  public onItemClick(index: number): void {
    if (this.isDisabled) {
      return;
    }

    this.selectItem(index);
  }

  public onResetToDefault(): void {
    this.index = this.initSelectionIndex();
  }
  // #endregion

  protected selectItem(index: number): void {
    if (!this.isIndexValid(index)) {
      return;
    }

    if (this.index === null) {
      // Nothing is selected.
      this.index = index;
    }
    // Toggle off if index is already selected.
    this.index = (this.index !== index) ? index : null;

    this.onChange(index);
  }

  public getItemClass(index: number): string {
    let className: string = 'div-select-item';

    if (this.isItemSelected(index)) {
      className += ' select-item-selected';
    }

    return className;
  }

  public isItemSelected(index: number): boolean {
    if (!this.isIndexValid(index)) {
      return false;
    }

    if (this.index === null) {
      return false;
    }

    return this.index === index;
  }

  protected isIndexValid(index: number): boolean {
    if (index < 0 || index >= this.selectionList().length) {
      return false;
    }

    return true;
  }
}
