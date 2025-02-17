import {
  Component, InputSignal, ModelSignal,
  WritableSignal,
  input,
  model
} from "@angular/core";
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { EditButtonComponent } from "@app/shared/buttons";
import { TextSelectListCombo } from "@app/shared/models";
import { getIndexByValue, getListItem } from "@app/shared/utils";
import { BitdCharBasicInfo } from "@app/sheet-viewer/bitd";
import { SelectListFieldComponent, TextFieldComponent } from "@app/sheet-viewer/fields";
import { BaseEditSectionDirective, TextSelectListSectionComponent } from "@app/sheet-viewer/sections";


import { BitdCharBasicInfoSignal, TextSelectListComboSignal } from "../../../../../_TESTING/tester.component";

@Component({
  selector: 'bitd-char-basic-info-section',
  templateUrl: 'bitd-char-basic-info-section.component.html',
  styleUrl: 'bitd-char-basic-info-section.component.scss',
  imports: [FormsModule, ReactiveFormsModule, EditButtonComponent, TextFieldComponent, SelectListFieldComponent, TextSelectListSectionComponent],
  standalone: true
})
export class BitdCharBasicInfoSectionComponent extends BaseEditSectionDirective {
  // #region Params
  public sectionModel: ModelSignal<BitdCharBasicInfo> = model.required<BitdCharBasicInfo>();
  //public sectionModel: InputSignal<BitdCharBasicInfoSignal> = input.required<BitdCharBasicInfoSignal>();
  // #endregion

  // #region Form Group
  protected buildSectionGroup(): FormGroup {
    const sectionGroup: FormGroup = this.formBuilder.group({
      name: new FormControl<string>(this.sectionModel().name),
      alias: new FormControl<string>(this.sectionModel().alias),
      look: new FormControl<string>(this.sectionModel().look),
      //heritageText: new FormControl(this.sectionModel().heritage.text),
      //heritage: new FormControl(getListItem(this.sectionModel().heritage.valueList, this.sectionModel().heritage.selectedIndex)),
      //backgroundText: new FormControl(this.sectionModel().background.text),
      //background: new FormControl(getListItem(this.sectionModel().background().valueList(), this.sectionModel().background().selectedIndex())),
      //viceText: new FormControl(this.sectionModel().vice().text()),
      //vice: new FormControl(getListItem(this.sectionModel().vice().valueList(), this.sectionModel().vice().selectedIndex()))
    })

    return sectionGroup;
  }

  protected subscribeToValueChanges(sectionGroup: FormGroup): void {
    sectionGroup.controls['name'].valueChanges.subscribe((val) => { this.onTextFieldChange('name', val) });
    sectionGroup.controls['alias'].valueChanges.subscribe((val) => { this.onTextFieldChange('alias', val) });
    sectionGroup.controls['look'].valueChanges.subscribe((val) => { this.onTextFieldChange('look', val) });
    //sectionGroup.controls['heritageText'].valueChanges.subscribe((val) => { this.onTextComboFieldChange('heritage', val) });
    //sectionGroup.controls['heritage'].valueChanges.subscribe((val) => { this.onSelectListFieldChange('heritage', val) });
    //sectionGroup.controls['backgroundText'].valueChanges.subscribe((val) => { this.onTextComboFieldChange(this.sectionModel().background, val) });
    //sectionGroup.controls['background'].valueChanges.subscribe((val) => { this.onSelectListFieldChange(this.sectionModel().background, val) });
    //sectionGroup.controls['viceText'].valueChanges.subscribe((val) => { this.onTextComboFieldChange(this.sectionModel().vice, val) });
    //sectionGroup.controls['vice'].valueChanges.subscribe((val) => { this.onSelectListFieldChange(this.sectionModel().vice, val) });
  }

  protected updateFormControlValues(): void {
    console.log(`In section: ${JSON.stringify(this.sectionGroup.getRawValue())}`);
    //this.sectionGroup.patchValue({
    //  name: this.sectionModel().name,
    //  alias: this.sectionModel().alias,
    //  look: this.sectionModel().look,
    //  //heritageText: this.sectionModel().heritage.text,
    //  //heritage: getListItem(this.sectionModel().heritage.valueList, this.sectionModel().heritage.selectedIndex),
    //  //backgroundText: this.sectionModel().background.text,
    //  //background: getListItem(this.sectionModel().background.valueList, this.sectionModel().background.selectedIndex),
    //  //viceText: this.sectionModel().vice.text,
    //  //vice: getListItem(this.sectionModel().vice.valueList, this.sectionModel().vice.selectedIndex),
    //},
    //{
    //  emitEvent: false
    //});
  }
  // #endregion

  // #region OnChange
  protected onTextFieldChange(fieldName: string, val: string): void {
    console.log(`IN BASIC INFO, changing select field: ${(this.sectionModel()[fieldName as keyof BitdCharBasicInfo] as string) } vs ${val}`);
    (this.sectionModel()[fieldName as keyof BitdCharBasicInfoSignal] as string) = val;
    //console.log(`IN BASIC INFO, changing select field: ${fieldSignal()} vs ${val}`);
    //fieldSignal.set(val);
  }

  //protected onTextComboFieldChange(field: WritableSignal<TextSelectListComboSignal>, val: string): void {
  //  field().text.set(val);
  //}

  //protected onSelectListFieldChange(field: WritableSignal<TextSelectListComboSignal>, val: string): void {
  //  field().selectedIndex.set(getIndexByValue(field().valueList(), val));
  //}
  // #endregion
}
