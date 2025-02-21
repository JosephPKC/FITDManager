import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SelectTextInfo } from "@shared/models";
import { SelectInputComponent, TextInputComponent } from "@sheet/inputs";
import { BaseInputGroupDirective } from "@sheet/sections";

/**
 * Combination of a text and select input.
 * Optionally, changes to the select input can affect the text input.
 */
@Component({
  selector: "select-text",
  templateUrl: "select-text.component.html",
  styleUrl: "select-text.component.scss",
  imports: [FormsModule, ReactiveFormsModule, SelectInputComponent, TextInputComponent],
  standalone: true
})
export class SelectTextComponent extends BaseInputGroupDirective<SelectTextInfo> {
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
