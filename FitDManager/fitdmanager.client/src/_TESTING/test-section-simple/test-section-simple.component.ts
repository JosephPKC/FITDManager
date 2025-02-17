//// Core
//import { Component, InputSignal, input } from "@angular/core";
//import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

//// App
//import { SelectListFieldComponent, TextFieldComponent } from "@app/sheet-viewer/fields";
//import { BaseSectionDirective } from "@app/sheet-viewer/sections";

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
//  selector: 'test-section-simple',
//  templateUrl: 'test-section-simple.component.html',
//  styleUrl: 'test-section-simple.component.scss',
//  imports: [FormsModule, ReactiveFormsModule, TextFieldComponent, SelectListFieldComponent],
//  standalone: true
//})
//export class TestSectionSimpleComponent extends BaseSectionDirective {
//  // #region Inputs
//  public sectionApiModel: InputSignal<TestSectionApiModel> = input.required<TestSectionApiModel>();
//  // #endregion

//  // #region State

//  // #endregion

//  // #region LifeCycle
//  public override ngOnInit(): void {
//    super.ngOnInit();
//  }
//  // #endregion

//  // #region Section Form Group
//  protected buildSectionGroup(): FormGroup {
//    // Build out the section form group
//    let sectionGroup: FormGroup = this.formBuilder.group({
//      vice: new FormControl(this.sectionApiModel().testTextSelectListText1),
//      purveyor: new FormControl(this.sectionApiModel().testTextSelectListText1),
//      viceSelect: new FormControl(this.sectionApiModel().testTextSelectListValue1),
//    })

//    // Subscribe to valueChanges
//    sectionGroup.controls['vice'].valueChanges.subscribe(this.onTextInputChange);
//    sectionGroup.controls['purveyor'].valueChanges.subscribe(this.onTextInputChange);
//    sectionGroup.controls['viceSelect'].valueChanges.subscribe(this.onSelectListChange);

//    return sectionGroup;
//  }
//  // #endregion

//  // #region OnChange Subscriptions
//  public onTextInputChange(val: string): void {
//    console.log(`TEXT INPUT CHANGED, NEW VALUE: ${val}.`);
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
//  // #endregion
//}
