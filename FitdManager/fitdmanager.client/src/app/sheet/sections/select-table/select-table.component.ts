import { Component, InputSignal, InputSignalWithTransform, booleanAttribute, input } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SelectTableInfo } from "@shared/models";
import { MultiSelectInputComponent, ViewTableInputComponent } from "@sheet/inputs";
import { BaseInputGroupDirective } from "@sheet/sections";

/**
 * Combination of a single table and a multi select input.
 */
@Component({
  selector: "select-table",
  templateUrl: "select-table.component.html",
  styleUrl: "select-table.component.scss",
  imports: [FormsModule, ReactiveFormsModule, MultiSelectInputComponent, ViewTableInputComponent],
  standalone: true
})
export class SelectTableComponent extends BaseInputGroupDirective<SelectTableInfo> {
  // #region Inputs
  public tableHeader: InputSignal<string> = input<string>("");
  public tableFooter: InputSignal<string> = input<string>("");
  public tableEnforceUnique: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, { transform: booleanAttribute });
  // #endregion

  // #region Form Group
  protected override buildFormGroup(): FormGroup {
    const sectionGroup: FormGroup = this.formBuilder.group({
      selectedIndices: new FormControl<number[]>(this.groupModel().selectedIndices.slice()),
      itemTableList: new FormControl<string[]>(this.groupModel().itemTableList.slice())
    })

    sectionGroup.controls["selectedIndices"].valueChanges.subscribe((x: number[]) => { this.onSelectedIndicesChange(x) });

    return sectionGroup;
  }

  protected override updateFormValues(): void {
    this.inputsGroup().patchValue({
      selectedIndices: this.groupModel().selectedIndices.slice(),
      itemTableList: this.groupModel().itemTableList.slice()
    });
  }
  // #endregion

  // #region Control Syncing
  /**
   * When the select list changes, the component needs to sync the table items appropriately.
   * @param selectedIndices The selected indices from the select list.
   */
  protected onSelectedIndicesChange(selectedIndices: number[]): void {
    const valueList: string[] = this.groupModel().valueList;

    // Use the selected indices to create the string list, in alphabetical order always.
    let newItems: string[] = selectedIndices.map((x: number, i: number, arr: number[]) => {
      return valueList[x];
    });

    this.inputsGroup().patchValue({
      itemTableList: newItems
    });
  }
  // #endregion
}
