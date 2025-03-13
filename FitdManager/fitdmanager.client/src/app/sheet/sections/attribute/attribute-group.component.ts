import {
  Component, InputSignalWithTransform,
  booleanAttribute, input
} from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { TrackInputComponent } from "@sheet/inputs";
import { AttributeModel } from "@sheet/models";
import { BaseInputGroupDirective } from "@sheet/sections";

export interface AttributeState {
  attributeXp: number;
  actionRatings: number[];
}

@Component({
  selector: "attribute-group",
  templateUrl: "attribute-group.component.html",
  styleUrl: "attribute-group.component.scss",
  imports: [ReactiveFormsModule, TrackInputComponent],
  standalone: true
})
export class AttributeGroupComponent extends BaseInputGroupDirective<AttributeModel> {
  // #region Inputs
  public locked: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(true, { transform: booleanAttribute });
  // #endregion

  // #region BaseInputGroupDirective
  protected buildFormGroup(): FormGroup {
    const group: FormGroup = this.formBuilder.group({
      rating: new FormControl<number>(this.groupModel().rating),
      xp: new FormControl<number>(this.groupModel().xp.marks)
    });

    for (let i = 0; i < this.groupModel().actions.length; i++) {
      const name: string = this.groupModel().actions[i].name.toLowerCase();
      group.addControl(name, new FormControl<number>(this.groupModel().actions[i].rating.marks));
      group.controls[name].valueChanges.subscribe((v: number) => { this.updateAttributeRating() });
    }

    return group;
  }

  protected updateFormValues(): void {
    this.inputsGroup().patchValue({
      rating: this.groupModel().rating,
      xp: this.groupModel().xp.marks
    });

    for (let i = 0; i < this.groupModel().actions.length; i++) {
      const name: string = this.groupModel().actions[i].name.toLowerCase();
      const ctrl: AbstractControl = this.inputsGroup().controls[name];
      if (ctrl === undefined) {
        // Skip as it can update before the form group is created
        continue;
      }

      ctrl.setValue(this.groupModel().actions[i].rating.marks);
    }
  }

  protected updateAttributeRating(): void {
    let rating = 0;
    for (let i = 0; i < this.groupModel().actions.length; i++) {
      const name: string = this.groupModel().actions[i].name.toLowerCase();
      if (this.inputsGroup().controls[name].value > 0) {
        rating++;
      }
    }

    this.inputsGroup().controls["rating"].setValue(rating);
  }
  // #endregion
}
