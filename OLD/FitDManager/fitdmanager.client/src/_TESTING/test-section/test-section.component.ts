//// Core
//import { Component, InputSignal, ModelSignal, Signal, computed, input, model } from "@angular/core";
//import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

//// App
//import { SelectListFieldComponent, TextFieldComponent } from "@app/sheet-viewer/fields";
//import { BaseSectionDirective } from "@app/sheet-viewer/sections";
//import { EditButtonComponent, ResetButtonComponent } from "@app/shared/buttons";

//export class TestSectionApiModel {
//  public textInput1: string = '';
//  public textInput2: string = '';
//  public testAllSelectListValues1: string[] = [];
//  public testSelectListValue1: string = '';
//  public testTextSelectListValues1: string[] = [];
//  public testTextSelectListValue1: string = '';
//  public testTextSelectListText1: string = '';
//}

//@Component({
//  selector: 'test-section',
//  templateUrl: 'test-section.component.html',
//  styleUrl: 'test-section.component.scss',
//  imports: [FormsModule, ReactiveFormsModule, TextFieldComponent, SelectListFieldComponent, EditButtonComponent, ResetButtonComponent],
//  standalone: true
//})
//export class TestSectionComponent extends BaseSectionDirective {
//  // #region Inputs
//  public sectionApiModel: ModelSignal<TestSectionApiModel> = model.required<TestSectionApiModel>();
//  // #endregion

//  // #region Section Form Group
//  protected buildSectionGroup(): FormGroup {
//    // Build out the section form group
//    let sectionGroup: FormGroup = this.formBuilder.group({
//      name: new FormControl(this.sectionApiModel().textInput1),
//      heritage: new FormControl(this.sectionApiModel().testSelectListValue1),
//    })

//    // Subscribe to valueChanges
//    sectionGroup.controls['name'].valueChanges.subscribe((val) => this.onTextInputChange(val));
//    sectionGroup.controls['heritage'].valueChanges.subscribe(this.onSelectListChange);

//    return sectionGroup;
//  }

//  protected updateFormControlValues(): void {

//  }
//  // #endregion

//  // #region Controls
//  public onClickResetToDefault(): void {
//    console.log(`Resetting to defaults in section ${this.sectionName()}`);
//    // Need to reset the api model to defaults

//  }

//  // #endregion

//  // #region OnChange Subscriptions
//  public onTextInputChange(val: string): void {
//    console.log(`TEXT INPUT CHANGED, NEW VALUE: ${val}.`);
//    console.log(`CHECKING API MODEL IN SECTION: ${this.sectionApiModel().textInput1}`);
//    // Potential logic to do post procsesing after input changes in a section.
//    // Can do logic within the section locally.
//    // If it needs access to data outside of the section, then it needs to either:
//    // - Allow the parent to pass in the on change subscription methods for each input themselves, or
//    // - Emit the changes as a model to the parent
//    // Validations can be:
//    //  - Simple validations can be done via forms
//    //  - Complex, cross section validations can be done by:
//    //    - Emit the section model to the parent on change.
//    //    - The parent passes in an error subject. The parent emits an error to the subject for the section to observe.
//    //    - The error needs to have the error message, and it also needs to know which input fields it errored on.
//  }

//  public onSelectListChange(val: string): void {
//    console.log(`SELECT LIST INPUT CHANGED, NEW INDEX: ${val}.`);
//    // It looks like the onChange and form control default value dictates how the getrawdata works.
//    // - Right now, it saves the list item value as its value
//    // - To change it to the index, we need to set the default value of the form control as the index
//    //    - And also change the onChange to take in the index number and use that.

//    // - The init form control value is what is saved when sheet is saved on load.
//    // - When any change is made to the form control value, then onChange dictates what is saved.
//  }

//  public onTextSelectListChange(val: string): void {
//    console.log(`TEXT SELECT LIST INPUT CHANGED, NEW INDEX: ${val}.`);
//    // It looks like the onChange and form control default value dictates how the getrawdata works.
//    // - Right now, it saves the list item value as its value
//    // - To change it to the index, we need to set the default value of the form control as the index
//    //    - And also change the onChange to take in the index number and use that.

//    // - The init form control value is what is saved when sheet is saved on load.
//    // - When any change is made to the form control value, then onChange dictates what is saved.
//  }
//  // #endregion
//}
