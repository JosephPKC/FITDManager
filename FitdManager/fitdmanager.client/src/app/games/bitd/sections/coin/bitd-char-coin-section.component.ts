import { Component, Signal, computed } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { BitdCharCoinModel } from "@games/bitd/models";
import { TrackInputComponent } from "@sheet/inputs";
import { AttributeGroupComponent, BaseSectionDirective, SectionShellComponent } from "@sheet/sections";

@Component({
  selector: "bitd-char-coin-section",
  templateUrl: "bitd-char-coin-section.component.html",
  styleUrl: "bitd-char-coin-section.component.scss",
  imports: [ReactiveFormsModule, SectionShellComponent, AttributeGroupComponent, TrackInputComponent],
  standalone: true
})
export class BitdCharCoinSectionComponent extends BaseSectionDirective<BitdCharCoinModel> {
  protected override buildFormGroup(): FormGroup {
    const sectionGroup: FormGroup = this.formBuilder.group({
      coin: new FormControl<number>(this.groupModel().coin.marks),
      stash: new FormControl<number>(this.groupModel().stash.marks)
    });
    return sectionGroup;
  }

  protected override updateFormValues(): void {
    this.inputsGroup().patchValue({
      coin: this.groupModel().coin.marks,
      stash: this.groupModel().stash.marks,
    });
  }
}
