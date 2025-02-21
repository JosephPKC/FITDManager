import {
  Directive, InputSignal, OnChanges, OnInit, Signal, SimpleChange, SimpleChanges, WritableSignal,
  computed, inject, input, linkedSignal, signal
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

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

  public formGroup: InputSignal<FormGroup> = input.required<FormGroup>();
  public name: InputSignal<string> = input.required<string>();
  public groupModel: InputSignal<TModel> = input.required<TModel>();
  // #endregion

  // #region Internals
  protected inputsGroup: WritableSignal<FormGroup>;
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
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["groupModel"] !== undefined && changes["groupModel"].currentValue !== undefined) {
      this.updateFormValues();
    }
  }
  // #endregion
}
