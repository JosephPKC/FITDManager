import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BitdCharBasicInfo } from "@games/bitd/models";
import { LockButtonComponent, HideButtonComponent } from "@shared/buttons";
import { TextInputComponent } from "@sheet/inputs";
import { BaseSectionDirective, TextSelectComboComponent } from "@sheet/sections";

@Component({
  selector: "bitd-char-basic-info-section",
  templateUrl: "bitd-char-basic-info-section.component.html",
  styleUrl: "bitd-char-basic-info-section.component.scss",
  imports: [FormsModule, ReactiveFormsModule, LockButtonComponent, HideButtonComponent, TextInputComponent, TextSelectComboComponent],
  standalone: true
})
export class BitdCharBasicInfoSectionComponent extends BaseSectionDirective<BitdCharBasicInfo> {
  // #region Form Group
  protected override buildFormGroup(): FormGroup {
    const sectionGroup: FormGroup = this.formBuilder.group({
      name: new FormControl<string>(this.groupModel().name),
      alias: new FormControl<string>(this.groupModel().alias),
      look: new FormControl<string>(this.groupModel().look),
    })

    return sectionGroup;
  }

  protected override updateFormValues(): void {
    this.inputsGroup().patchValue({
      name: this.groupModel().name,
      alias: this.groupModel().alias,
      look: this.groupModel().look
    });
  }
  // #endregion
}
