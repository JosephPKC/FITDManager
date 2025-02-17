import {
    AfterContentInit,
    AfterViewInit,
  Directive, InputSignal, ModelSignal, OnChanges, OnInit, Signal,
  SimpleChange,
  SimpleChanges,
  WritableSignal,
  computed, inject, input, model,
  signal
} from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective } from "@angular/forms";

import { callIfChanged } from "@app/shared/utils";

/**
 * Base for custom sections, which are containerse for related inputs for forms.
 * Each section is modelled as its own form group.
 * Each section can be hidden and locked as a group.
 */
@Directive({
  selector: "base-section"
})
export abstract class BaseSectionDirective implements OnChanges, OnInit {
  // #region Services
  protected formBuilder: FormBuilder = inject(FormBuilder);
  // #endregion

  // #region Params
  public formGroup: InputSignal<FormGroup> = input.required<FormGroup>();
  public name: InputSignal<string> = input.required<string>();
  public label: InputSignal<string> = input<string>("");
  public locked: InputSignal<boolean> = input<boolean>(true);
  // #endregion

  // #region Internal
  protected sectionGroup: WritableSignal<FormGroup>;
  protected isSectionLocked: WritableSignal<boolean> = signal<boolean>(this.locked());
  // #endregion

  // #region Computes
  protected sectionClass: Signal<string> = computed<string>(() => {
    let className: string = 'div-section';

    if (this.isSectionLocked()) {
      className += ' div-section-unlocked'
    }
    else {
      className += ' div-section-locked'
    }

    return className;
  })

  protected sectionInputsClass: Signal<string> = computed<string>(() => {
    let className: string = 'div-section-fields';

    if (!this.isSectionLocked()) {
      className += ' div-disabled';
    }

    return className;
  });
  // #endregion

  // #region Abstracts
  /**
   * Builds out the section's form group.
   */
  protected abstract buildSectionGroup(): void;
  /**
   * Subscribe to the form controls' valueChanges after form group creation.
   */
  protected abstract subscribeToValueChanges(): void;
  /**
   * Processes any input changes.
   * @param propName The name of the input property that changed.
   * @param change The SimpleChange object.
   */
  protected abstract processInputChange(propName: string, change: SimpleChange): void;
  // #endregion

  public constructor() {
    this.sectionGroup = signal<FormGroup>(this.formBuilder.group({}));
  }

  // #region Lifecycle
  public ngOnInit(): void {
    this.buildSectionGroup();
    this.subscribeToValueChanges();

    this.formGroup().addControl(this.name(), this.sectionGroup);

    this.setControlLocks(this.isSectionLocked());

    this.additionalOnInit();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const prop: SimpleChange = changes[propName];
      this.processInputChange(propName, prop);
    }

    this.additionalOnChanges();
  }

  /**
   * Add additional logic at the end of ngOnInit.
   */
  protected additionalOnInit(): void { }
  /**
   * Add additional logic at the end of ngOnChanges.
   */
  protected additionalOnChanges(): void { }
  // #endregion

  // #region Helpers
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
}
