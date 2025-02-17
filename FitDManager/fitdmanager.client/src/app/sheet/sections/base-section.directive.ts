import {
  Directive, InputSignal, OnChanges, OnInit, Signal, SimpleChange, SimpleChanges, WritableSignal,
  computed, inject, input, linkedSignal, signal
} from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";

/**
 * Base for custom sections, which are containerse for related inputs for forms.
 * Each section is modelled as its own form group.
 * Each section can be hidden and locked as a group.
 */
@Directive({
  selector: "base-section"
})
export abstract class BaseSectionDirective<T> implements OnChanges, OnInit {
  // #region Services
  protected formBuilder: FormBuilder = inject(FormBuilder);
  // #endregion

  // #region Params
  public formGroup: InputSignal<FormGroup> = input.required<FormGroup>();
  public name: InputSignal<string> = input.required<string>();
  public sectionModel: InputSignal<T> = input.required<T>();
  public label: InputSignal<string> = input<string>("");
  public locked: InputSignal<boolean> = input<boolean>(true);
  // #endregion

  // #region Internals
  protected sectionGroup: WritableSignal<FormGroup>;
  protected isSectionHidden: WritableSignal<boolean> = signal<boolean>(false);

  protected isSectionLocked: WritableSignal<boolean> = linkedSignal<boolean>(() => {
    return this.locked();
  });

  protected sectionClass: Signal<string> = computed<string>(() => {
    let className: string = "div-section";

    if (this.isSectionLocked()) {
      className += " div-section-locked"
    }
    else {
      className += " div-section-unlocked"
    }

    return className;
  })

  protected sectionInputsClass: Signal<string> = computed<string>(() => {
    let className: string = "div-section-fields";

    if (!this.isSectionLocked()) {
      className += " div-disabled";
    }

    return className;
  });
  // #endregion

  // #region Abstracts
  /**
   * Builds out the section"s form group.
   */
  protected abstract buildSectionGroup(): FormGroup;

  /**
   * Updates the form values when the model is changed.
   */
  protected abstract updateFormValues(): void;
  // #endregion

  public constructor() {
    this.sectionGroup = signal<FormGroup>(this.formBuilder.group({}));
  }

  // #region Overridables
  /**
   * Processes input changes, specifically related to the model or other parameters.
   * @param propName The name of the input property that changed.
   * @param change The SimpleChange object.
   */
  protected processInputChange(propName: string, change: SimpleChange): void { }
  /**
   * Add additional logic at the end of ngOnInit.
   */
  protected additionalOnInit(): void { }
  /**
   * Add additional logic at the end of ngOnChanges.
   */
  protected additionalOnChanges(): void { }
  // #endregion

  // #region Lifecycle
  public ngOnInit(): void {
    this.sectionGroup.set(this.buildSectionGroup());
    this.formGroup().addControl(this.name(), this.sectionGroup());

    this.setControlLocks(this.isSectionLocked());

    this.additionalOnInit();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const prop: SimpleChange = changes[propName];
      if (propName === "locked" && prop.currentValue !== undefined) {
        // Locked input
        this.setControlLocks(this.isSectionLocked());
      }
      else if (propName === "sectionModel" && prop.currentValue !== undefined) {
        // Model input
        this.updateFormValues();
      }
      else if (prop.currentValue !== undefined) {
        // Other inputs
        this.processInputChange(propName, prop);
      }
    }

    this.additionalOnChanges();
  }
  // #endregion

  // #region Lock Controls
  protected onChangeLock(locked: boolean): void {
    this.isSectionLocked.set(locked);
    this.setControlLocks(locked);
  }

  protected setControlLocks(locked: boolean): void {
    for (const field in this.sectionGroup().controls) {
      const control: AbstractControl<any, any> = this.sectionGroup().get(field)!;
      if (locked) {
        control.disable({ emitEvent: false });
      }
      else {
        control.enable({ emitEvent: false });
      }
    }
  }
  // #endregion

  // #region Hide Controls
  protected onChangeHide(hidden: boolean): void {
    this.isSectionHidden.set(hidden);
  }
  // #endregion

  // #region Helpers
  protected subscribeToValueChanges<T>(group: FormGroup, controlName: string, onValueChanges: (x: T) => void) {
    group.controls[controlName].valueChanges.subscribe(onValueChanges);
  }
  // #endregion
}
