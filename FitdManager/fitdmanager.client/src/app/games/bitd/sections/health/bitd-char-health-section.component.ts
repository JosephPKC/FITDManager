import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BitdCharHealth } from "@games/bitd/models";
import { LockButtonComponent, HideButtonComponent } from "@shared/buttons";
import { TextInputComponent, TrackInputComponent } from "@sheet/inputs";
import { BaseSectionDirective, TextSelectComboComponent } from "@sheet/sections";

@Component({
  selector: "bitd-char-health-section",
  templateUrl: "bitd-char-health-section.component.html",
  styleUrl: "bitd-char-health-section.component.scss",
  imports: [FormsModule, ReactiveFormsModule, LockButtonComponent, HideButtonComponent, TrackInputComponent],
  standalone: true
})
export class BitdCharHealthSectionComponent extends BaseSectionDirective<BitdCharHealth> {
  // #region Form Group
  protected override buildFormGroup(): FormGroup {
    const sectionGroup: FormGroup = this.formBuilder.group({
      stress: new FormControl<number>(4)
    })

    return sectionGroup;
  }

  protected override updateFormValues(): void {
    this.inputsGroup().patchValue({

    });
  }
  // #endregion
}
