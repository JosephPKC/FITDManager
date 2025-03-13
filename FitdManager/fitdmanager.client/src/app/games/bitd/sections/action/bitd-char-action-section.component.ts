import { Component, Signal, computed } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { BitdCharActionModel } from "@games/bitd/models";
import { TrackInputComponent } from "@sheet/inputs";
import { AttributeModel } from "@sheet/models";
import { AttributeGroupComponent, BaseSectionDirective, SectionShellComponent } from "@sheet/sections";

@Component({
  selector: "bitd-char-action-section",
  templateUrl: "bitd-char-action-section.component.html",
  styleUrl: "bitd-char-action-section.component.scss",
  imports: [ReactiveFormsModule, SectionShellComponent, AttributeGroupComponent, TrackInputComponent],
  standalone: true
})
export class BitdCharActionSectionComponent extends BaseSectionDirective<BitdCharActionModel> {
  // #region Computes
  protected attributesList: Signal<AttributeModel[]> = computed<AttributeModel[]>(() => {
    return [this.groupModel().insight, this.groupModel().prowess, this.groupModel().resolve];
  });
  // #endregion

  protected override buildFormGroup(): FormGroup {
    const sectionGroup: FormGroup = this.formBuilder.group({
      playbookXp: new FormControl<number>(this.groupModel().playbookXp.marks)
    });
    return sectionGroup;
  }

  protected override updateFormValues(): void {
    this.inputsGroup().patchValue({
      xp: this.groupModel().playbookXp.marks
    });
  }
}
