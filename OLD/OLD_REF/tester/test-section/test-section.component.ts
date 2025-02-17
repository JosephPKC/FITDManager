import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TextInputComponent } from "../../core/inputs/text/text-input.component";
import { SelectListInputComponent } from "../../core/inputs/select-list/select-list-input.component";
import { BaseSectionDirective } from "../../core/sections/base-section.directive";

@Component({
  selector: 'test-section',
  templateUrl: 'test-section.component.html',
  styleUrl: 'test-section.component.scss',
  imports: [FormsModule, ReactiveFormsModule, TextInputComponent, SelectListInputComponent],
  standalone: true
})
export class TestSectionComponent extends BaseSectionDirective {
  // #region State

  // #endregion

  // #region Section Form Group
  protected buildSectionGroup(): FormGroup {
    // Build out the section form group
    let sectionGroup: FormGroup = this.formBuilder.group({
      textInput1: new FormControl('test1'),
      textInput2: new FormControl('test2')
    })

    // Subscribe to valueChanges
    sectionGroup.controls['textInput1'].valueChanges.subscribe(this.onTextInputChange);
    sectionGroup.controls['textInput2'].valueChanges.subscribe(this.onTextInputChange);

    return sectionGroup;
  }
  // #endregion

  // #region Controls
  protected toggleEnableToAll(editable: boolean): void {
    for (const field in this.sectionGroup.controls) {
      const control: AbstractControl<any, any> = this.sectionGroup.get(field)!;
      if (editable) {
        control.enable({ emitEvent: false });
      }
      else {
        control.disable({ emitEvent: false });
      }
    }
  }

  public onClickResetToDefault(): void {
    console.log(`Resetting to defaults in section ${this.sectionName()}`);
    this.resettingToDefaultSection.next(true);
  }

  // #endregion

  // #region OnChange Subscriptions
  public onTextInputChange(val: string): void {
    console.log(`TEXT INPUT CHANGED, NEW VALUE: ${val}.`);
    // Potential logic to do post procsesing after input changes in a section.
    // Can do logic within the section locally.
    // If it needs access to data outside of the section, then it needs to either:
    // - Allow the parent to pass in the on change subscription methods for each input themselves, or
    // - Emit the changes as a model to the parent
    // Validations can be:
    //  - Simple validations can be done via forms
    //  - Complex, cross section validations can be done by:
    //    - Emit the section model to the parent on change.
    //    - The parent passes in an error subject. The parent emits an error to the subject for the section to observe.
    //    - The error needs to have the error message, and it also needs to know which input fields it errored on.
  }
  // #endregion
}
