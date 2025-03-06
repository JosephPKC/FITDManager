import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { BitdCharBasicInfo } from "@games/bitd/models";
import { SingleSelectInputComponent, TextInputComponent } from "@sheet/inputs";
import { BaseSectionDirective, SectionShellComponent } from "@sheet/sections";

@Component({
  selector: "bitd-char-basic-info-section",
  templateUrl: "bitd-char-basic-info-section.component.html",
  styleUrl: "bitd-char-basic-info-section.component.scss",
  imports: [ReactiveFormsModule, SectionShellComponent, SingleSelectInputComponent, TextInputComponent],
  standalone: true
})
export class BitdCharBasicInfoSectionComponent extends BaseSectionDirective<BitdCharBasicInfo> {
  protected override buildFormGroup(): FormGroup {
    const sectionGroup: FormGroup = this.formBuilder.group({
      name: new FormControl<string>(this.groupModel().name),
      alias: new FormControl<string>(this.groupModel().alias),
      look: new FormControl<string>(this.groupModel().look),
      heritage: new FormGroup({
        text: new FormControl<string>(this.groupModel().heritage.text),
        selectedIndex: new FormControl<number | null>(this.groupModel().heritage.selectedIndex)
      }),
      background: new FormGroup({
        text: new FormControl<string>(this.groupModel().background.text),
        selectedIndex: new FormControl<number | null>(this.groupModel().background.selectedIndex)
      }),
      vice: new FormGroup({
        text: new FormControl<string>(this.groupModel().vice.text),
        selectedIndex: new FormControl<number | null>(this.groupModel().vice.selectedIndex)
      }),
    })

    return sectionGroup;
  }

  protected override updateFormValues(): void {
    this.inputsGroup().patchValue({
      name: this.groupModel().name,
      alias: this.groupModel().alias,
      look: this.groupModel().look,
      heritage: {
        text: this.groupModel().heritage.text,
        selectedIndex: this.groupModel().heritage.selectedIndex
      },
      background: {
        text: this.groupModel().background.text,
        selectedIndex: this.groupModel().background.selectedIndex
      },
      vice: {
        text: this.groupModel().vice.text,
        selectedIndex: this.groupModel().vice.selectedIndex
      },
    });
  }
}
