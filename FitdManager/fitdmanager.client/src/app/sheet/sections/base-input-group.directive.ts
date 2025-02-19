import {
  Directive, InputSignal, OnChanges, OnInit, Signal, SimpleChange, SimpleChanges, WritableSignal,
  computed, inject, input, linkedSignal, signal
} from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";

/**
 * Base for all input groups, which are groups of related inputs.
 * An input group is represented by a form group internally.
 */
@Directive({
  selector: "base-input-group"
})
export abstract class BaseInputGroupDirective<TModel> implements OnChanges, OnInit {
  // #region Services
  protected formBuilder: FormBuilder = inject(FormBuilder);
  // #endregion

  // #region Params
  public label: InputSignal<string> = input<string>("");
  public locked: InputSignal<boolean> = input<boolean>(true);

  public formGroup: InputSignal<FormGroup> = input.required<FormGroup>();
  public name: InputSignal<string> = input.required<string>();
  public groupModel: InputSignal<TModel> = input.required<TModel>();
  // #endregion

  // #region Internals
  protected inputsGroup: WritableSignal<FormGroup>;

  protected divInputsClass: Signal<string> = computed<string>(() => {
    let className: string = this.getBaseInputsClass();

    if (this.isDisabled()) {
      className += " div-disabled";
    }

    return className;
  });
  // #endregion

  // #region Abstracts
  /**
   * Builds out the form group.
   */
  protected abstract buildFormGroup(): FormGroup;

  /**
   * Updates the form values when the model is changed.
   */
  protected abstract updateFormValues(): void;
  // #endregion

  public constructor() {
    this.inputsGroup = signal<FormGroup>(this.formBuilder.group({}));
  }

  // #region Lifecycle
  public ngOnInit(): void {
    this.inputsGroup.set(this.buildFormGroup());
    this.formGroup().addControl(this.name(), this.inputsGroup());

    this.setControlLocks();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const prop: SimpleChange = changes[propName];
      if (propName === "locked" && prop.currentValue !== undefined) {
        // Locked input
        this.setControlLocks();
      }
      else if (propName === "groupModel" && prop.currentValue !== undefined) {
        // Model input
        this.updateFormValues();
      }
    }
  }
  // #endregion

  // #region Helpers
  protected getBaseInputsClass(): string {
    return "div-group-inputs";
  }

  protected isDisabled(): boolean {
    return this.locked();
  }

  protected setControlLocks(): void {
    this.toggleControlLocks(this.locked());
  }

  protected toggleControlLocks(locked: boolean): void {
    for (const field in this.inputsGroup().controls) {
      const control: AbstractControl<any, any> = this.inputsGroup().get(field)!;
      if (locked) {
        control.disable({ emitEvent: false });
      }
      else {
        control.enable({ emitEvent: false });
      }
    }
  }
  // #endregion
}
