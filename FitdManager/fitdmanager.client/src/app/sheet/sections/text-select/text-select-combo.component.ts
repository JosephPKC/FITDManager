import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TextSelectListCombo } from "@shared/models";
import { SelectInputComponent, TextInputComponent } from "@sheet/inputs";
import { BaseInputGroupDirective } from "@sheet/sections";

/**
 * Combination of a text and select input.
 */
@Component({
  selector: "text-select-combo",
  templateUrl: "text-select-combo.component.html",
  styleUrl: "text-select-combo.component.scss",
  imports: [FormsModule, ReactiveFormsModule, SelectInputComponent, TextInputComponent],
  standalone: true
})
export class TextSelectComboComponent extends BaseInputGroupDirective<TextSelectListCombo> {
  // #region Form Group
  protected override buildFormGroup(): FormGroup {
    const sectionGroup: FormGroup = this.formBuilder.group({
      text: new FormControl<string>(this.groupModel().text),
      selectedValue: new FormControl<string>(this.groupModel().selectedValue)
    })

    return sectionGroup;
  }

  protected override updateFormValues(): void {
    this.inputsGroup().patchValue({
      text: this.groupModel().text,
      selectedValue: this.groupModel().selectedValue,
    });
  }
  // #endregion
}
