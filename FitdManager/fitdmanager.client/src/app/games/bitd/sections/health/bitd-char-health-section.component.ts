import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { BitdCharHealth } from "@games/bitd/models";
import { TrackInputComponent } from "@sheet/inputs";
import { BaseSectionDirective, SectionShellComponent } from "@sheet/sections";
import { MultiSelectInputComponent } from "../../../../sheet/inputs/select/multi-select-input.component";

@Component({
  selector: "bitd-char-health-section",
  templateUrl: "bitd-char-health-section.component.html",
  styleUrl: "bitd-char-health-section.component.scss",
  imports: [ReactiveFormsModule, SectionShellComponent, TrackInputComponent, MultiSelectInputComponent],
  standalone: true
})
export class BitdCharHealthSectionComponent extends BaseSectionDirective<BitdCharHealth> {
  // #region Form Group
  protected override buildFormGroup(): FormGroup {
    const sectionGroup: FormGroup = this.formBuilder.group({
      stress: new FormControl<number>(this.groupModel().stress.marks),
      multiStressTest: new FormControl<number[]>(this.groupModel().selectedTrauma.slice())
    })

    return sectionGroup;
  }

  protected override updateFormValues(): void {
    this.inputsGroup().patchValue({
      stress: this.groupModel().stress.marks,
      multiStressTest: this.groupModel().selectedTrauma.slice()
    });
  }
  // #endregion
}
