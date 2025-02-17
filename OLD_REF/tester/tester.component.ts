import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Subject } from "rxjs";

import { TestSectionComponent } from "./test-section/test-section.component";

@Component({
  selector: 'tester-component',
  templateUrl: 'tester.component.html',
  styleUrl: 'tester.component.scss',
  imports: [FormsModule, ReactiveFormsModule, TestSectionComponent],
  standalone: true
})
export class TesterComponent implements OnInit {
  // #region Services
  private formBuilder: FormBuilder = inject(FormBuilder);
  // #endregion
  public testForm!: FormGroup;

  public resettingToDefault: Subject<boolean> = new Subject();
  public togglingEditable: Subject<boolean> = new Subject();
  // Need subjects for click actions

  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
    });
  }

  public toggleEditable(): void {
    console.log(`Toggling Editable in Tester.`);

    this.togglingEditable.next(true);
  }

  public resetToDefault(): void {
    console.log(`Reseting to Default in Tester.`);

    this.resettingToDefault.next(true);
  }

  public saveForm(): void {
    console.log(`This is the value: ${JSON.stringify(this.testForm.value)}`);
    console.log(`This is the raw data: ${JSON.stringify(this.testForm.getRawValue())}`);
  }
}





/*
NOTES: TODO LIST, THOUGHTS
- The component structure of a sheet can be split into three tiers:
  - Sheet - Global, represents the whole sheet. Creates the structure of sections, but defers details to them. Handles global logic, validation, and api handling.
    - Has four main functions:
      - Global Edit - To toggle edit for all fields in the sheet. It will use an observable stream to emit the event to the sections.
      - Global Reset - To reset all fields to default. It will use an observable stream to emit the event to the sections.
      - Save - To retrive all data and save it. It will get raw data from the form group, create an api model and send it through the api handler.
      - Global Validation - To validate cross-sectional data or logic. It will use an observable stream to emit errors to the appropriate sections.
        - It will require have methods bound to each sections' change output emitters. This way, the sheet knows of all changes made and can do validation as needed.
        - If an error is global, it does not need to pass the error to each section.
    - Also, takes in api data and sends api data. This can be separated out to a sheet api handler instead.
      - It will pass in member data from the api model to the appropriate sections.

  - Section - Local, represents a section of a sheet. Creates the input structure of the section, but defers details to the inputs. Handles local logic and validation.
    - Note: Sections can have subsections as children.
    - Input api data will be given as api sub models. It will pass data to its children appropriately.
    - It will take in the parent form group.
      - It creates its own section form group, and adds it to the parent group.
      - If there are any subsections, defer its creation to the subsections.
    - Section Edit - Toggles edit for the section only. Simply toggle on or off all of its form controls. May need to use an observable stream to emit the event to subsections.
    - Section Reset - Toggles reset for the section only. Use an observable stream to emit the event to its inputs.
    - Observables from Parent:
      - Global Edit - Same as section edit.
      - Global Reset - Same as section reset.
    - Sectional Validation - Any local validation for the inputs.
      - Section has on change method handlers for each input as needed. It will pass these onto the inputs on creation.
      - On each change, it needs to validate the new value.
      - Sections handle all but the very basic validations for the input.
  - Field - Inputs, representing a field of the sheet. Handles value changes and user interaction.
    - Reset: Resets to default. It will listen to an observable stream for an event.
    - It handles its own value state, and emits event when the value state changes.
    - Combo Fields are a combination of fields that act like a section-field hybrid.
      - They are inputs first and foremost, but they have multiple input elements. Their value state is a combination of the input values.
      - They do not have sectional logic, though they might do low-level local validation.
- The idea is that logic will be deferred to the lowest, most local point it can. If it requires context beyond its locality, it will defer to the parent.
  - The parent supplies initial data for the child to be created. This gets passed down the chain as needed til the bottom.
  - The parent will supply observable streams for the child to monitor whenever the parent needs to trigger an event for the child. This is how the parent can tell child information after initial creation.
  - The parent will supply methods for the child to trigger when a local event occurs. The child can notify the parent this way via Output emitters. This is how the child can inform the parent.
*/
