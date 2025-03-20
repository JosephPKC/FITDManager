import {
  Component, InputSignalWithTransform,
  WritableSignal,
  booleanAttribute, input,
  signal
} from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { SelectTableInputComponent, ViewTableInputComponent } from "@sheet/inputs";
import { AbilityModel } from "@sheet/models";
import { BaseInputGroupDirective, BaseSectionDirective, SectionShellComponent } from "@sheet/sections";
import { BitdCharAbilityModel } from "@games/bitd/models";
import { HideButtonComponent } from "../../../../shared/buttons";

@Component({
  selector: "bitd-char-ability-section",
  templateUrl: "bitd-char-ability-section.component.html",
  styleUrl: "bitd-char-ability-section.component.scss",
  imports: [ReactiveFormsModule, SelectTableInputComponent, ViewTableInputComponent, HideButtonComponent, SectionShellComponent],
  standalone: true
})
export class BitdCharAbilitySectionComponent extends BaseSectionDirective<BitdCharAbilityModel> {
  protected isSectionHidden: WritableSignal<boolean> = signal<boolean>(false);

  // #region BaseSectionDirective
  protected buildFormGroup(): FormGroup {
    const group: FormGroup = this.formBuilder.group({
      selectedAbilities: new FormControl<string[]>(this.groupModel().selectedAbilities),
      playbookAbilities: new FormControl<string[]>(this.groupModel().playbookAbilities)
    });

    return group;
  }

  protected updateFormValues(): void {
    this.inputsGroup().patchValue({
      selectedAbilities: this.groupModel().selectedAbilities,
      playbookAbilities: this.groupModel().playbookAbilities
    });
  }
  // #endregion

  protected onChangeHide(hidden: boolean): void {
    this.isSectionHidden.set(hidden);
  }
}
