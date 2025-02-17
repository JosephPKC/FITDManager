import {
  Component, InputSignal, ModelSignal, Signal, WritableSignal,
  computed, input, model, signal
} from "@angular/core";
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TextSelectListCombo } from "@app/shared/models";
import { getIndexByValue, getListItem } from "@app/shared/utils";
import { TextFieldComponent, SelectListFieldComponent } from "@app/sheet-viewer/fields";
import { BaseSimpleSectionDirective } from "@app/sheet-viewer/sections";
import { TextSelectListComboSignal } from "../../../../_TESTING/tester.component";

/*
- Simple selection list input (like a drop-down list that shows all of its values)
*/
@Component({
  selector: 'text-select-list-section',
  templateUrl: 'text-select-list-section.component.html',
  styleUrl: 'text-select-list-section.component.scss',
  imports: [FormsModule, ReactiveFormsModule, TextFieldComponent, SelectListFieldComponent],
  standalone: true
})
export class TextSelectListSectionComponent extends BaseSimpleSectionDirective {
  // #region Params
  public comboModel: ModelSignal<TextSelectListCombo> = model.required<TextSelectListCombo>();
  //public comboModel: InputSignal<TextSelectListComboSignal> = input.required<TextSelectListComboSignal>();
  // #endregion


  // #region Form Group
  protected override buildSectionGroup(): FormGroup {
    const sectionGroup: FormGroup = this.formBuilder.group({
      text: new FormControl<string>(this.comboModel().text),
      selectedIndex: new FormControl<string>(getListItem(this.comboModel().valueList, this.comboModel().selectedIndex)),
    });

    return sectionGroup;
  }

  protected subscribeToValueChanges(sectionGroup: FormGroup): void {
    sectionGroup.controls['text'].valueChanges.subscribe((val) => { this.onTextComboFieldChange(val) });
    sectionGroup.controls['selectedIndex'].valueChanges.subscribe((val) => { this.onSelectListFieldChange(val) });
  }

  protected override updateFormControlValues(): void {
    //this.sectionGroup.setValue({
    //  text: this.comboModel().text,
    //  selectedIndex: getListItem(this.comboModel().valueList, this.comboModel().selectedIndex),
    //},
    //{
    //  emitEvent: false
    //});
  }
  // #endregion

  // #region OnChange
  protected onTextComboFieldChange(val: string): void {
    console.log(`IN TEXT_SELECT_LIST, changing select field: ${val}`);
    this.comboModel().text = val;
  }

  protected onSelectListFieldChange(val: string): void {
    console.log(`IN TEXT_SELECT_LIST, changing select field: ${val}`);
    this.comboModel().selectedIndex = getIndexByValue(this.comboModel().valueList, val);
  }
  // #endregion
}
