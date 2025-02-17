// Core
import { Component, InputSignal, input } from "@angular/core";
import { FormGroup } from "@angular/forms";


/*
- Sheet sections are sections of a sheet with similar fields.
- Each section is represented by a form group with its own set of inputs.
- Each section will handle building its form group, and appending to the parent group.
- Each section will handle loading default values for its inputs.
- Each section will handle getting raw data and creating a sub-model group that represents the section.
*/
@Component({
  selector: 'bitd-char-sheet-viewer',
  templateUrl: 'bitd-char-sheet-viewer.component.html',
  styleUrl: 'bitd-char-sheet-viewer.component.scss'
})
export abstract class SheetSectionBaseComponent<TSheet> {
  public sheetForm: InputSignal<FormGroup> = input.required<FormGroup>();

  public abstract buildAndAppendFormGroup(): void;
  public abstract loadDefaultValues(): void;
}
