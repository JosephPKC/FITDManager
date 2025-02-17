import {
  Component, InputSignal, SimpleChange, WritableSignal,
  input
} from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BitdCharBasicInfo } from "@games/bitd/models";
import { LockButtonComponent } from "@shared/buttons";
import { getIndexByValue, getListItem } from "@shared/utils";
import { SelectInputComponent, TextInputComponent } from "@sheet/inputs";
import { BaseSectionDirective } from "@sheet/sections";

@Component({
  selector: "bitd-char-basic-info-section",
  templateUrl: "bitd-char-basic-info-section.component.html",
  styleUrl: "bitd-char-basic-info-section.component.scss",
  imports: [FormsModule, ReactiveFormsModule, LockButtonComponent, SelectInputComponent, TextInputComponent],
  standalone: true
})
export class BitdCharBasicInfoSectionComponent extends BaseSectionDirective<BitdCharBasicInfo> {
  // #region Form Group
  protected override buildSectionGroup(): FormGroup {
    const sectionGroup: FormGroup = this.formBuilder.group({
      name: new FormControl<string>(this.sectionModel().name),
      alias: new FormControl<string>(this.sectionModel().alias),
      look: new FormControl<string>(this.sectionModel().look),
    })

    // Subscribe to valueChanges
    this.subscribeToValueChanges(sectionGroup, "name", (val: string) => { this.onTextFieldChange("name", val) });
    this.subscribeToValueChanges(sectionGroup, "alias", (val: string) => { this.onTextFieldChange("alias", val) });
    this.subscribeToValueChanges(sectionGroup, "look", (val: string) => { this.onTextFieldChange("look", val) });

    return sectionGroup;
  }

  protected override updateFormValues(): void {
    this.sectionGroup().patchValue({
      name: this.sectionModel().name,
      alias: this.sectionModel().alias,
      look: this.sectionModel().look
    });
  }
  // #endregion

  // #region OnChange
  protected onTextFieldChange(fieldName: string, val: string): void {
    (this.sectionModel()[fieldName as keyof BitdCharBasicInfo] as string) = val;
  }
  // #endregion
}
