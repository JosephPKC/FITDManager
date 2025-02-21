import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { BitdCharBasicInfo } from "@games/bitd/models";
import { TextInputComponent } from "@sheet/inputs";
import { BaseSectionDirective, SectionShellComponent, SelectTextComponent } from "@sheet/sections";

@Component({
  selector: "bitd-char-basic-info-section",
  templateUrl: "bitd-char-basic-info-section.component.html",
  styleUrl: "bitd-char-basic-info-section.component.scss",
  imports: [ReactiveFormsModule, SectionShellComponent, TextInputComponent, SelectTextComponent],
  standalone: true
})
export class BitdCharBasicInfoSectionComponent extends BaseSectionDirective<BitdCharBasicInfo> {
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
}
