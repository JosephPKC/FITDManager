import {
  Component, InputSignalWithTransform,
  Signal,
  WritableSignal,
  booleanAttribute, computed, input,
  signal
} from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { SingleTableInputComponent } from "@sheet/inputs";
import { AbilityModel, HarmModel } from "@sheet/models";
import { BaseInputGroupDirective, BaseSectionDirective, SectionShellComponent } from "@sheet/sections";
import { BitdCharContactModel, ContactModel } from "@games/bitd/models";

@Component({
  selector: "bitd-char-contact-section",
  templateUrl: "bitd-char-contact-section.component.html",
  styleUrl: "bitd-char-contact-section.component.scss",
  imports: [ReactiveFormsModule, SingleTableInputComponent, SectionShellComponent],
  standalone: true
})
export class BitdCharContactSectionComponent extends BaseSectionDirective<BitdCharContactModel> {
  // #region BaseSectionDirective
  protected buildFormGroup(): FormGroup {
    const group: FormGroup = this.formBuilder.group({
      contacts: new FormControl<ContactModel[]>(this.groupModel().contacts),
    });

    return group;
  }

  protected updateFormValues(): void {
    this.inputsGroup().patchValue({
      contacts: this.groupModel().contacts
    });
  }
  // #endregion
}
