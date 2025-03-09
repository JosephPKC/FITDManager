import { Component, Signal, computed } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { BitdCharHealthModel } from "@games/bitd/models";
import { ArmorModel, HarmModel } from "@sheet/models";
import { TableParams, CheckBoxInputComponent, MultiSelectInputComponent, MultiTableInputComponent, TrackInputComponent, ViewTableInputComponent } from "@sheet/inputs";
import { BaseSectionDirective, SectionShellComponent } from "@sheet/sections";

@Component({
  selector: "bitd-char-health-section",
  templateUrl: "bitd-char-health-section.component.html",
  styleUrl: "bitd-char-health-section.component.scss",
  imports: [ReactiveFormsModule, SectionShellComponent, CheckBoxInputComponent, MultiSelectInputComponent, MultiTableInputComponent, TrackInputComponent, ViewTableInputComponent],
  standalone: true
})
export class BitdCharHealthSectionComponent extends BaseSectionDirective<BitdCharHealthModel> {
  // #region Computes
  protected harmTableParams: Signal<TableParams[]> = computed<TableParams[]>(() => {
    const harm: HarmModel = this.groupModel().harm;
    const params: TableParams[] = new Array<TableParams>(4);

    // MINOR
    params[0] = ({
      header: harm.minorHarm.header,
      footer: harm.minorHarm.footer,
      name: harm.minorHarm.header,
      maxSize: harm.minorHarm.maxNbrOfData,
      hideIfEmpty: false
    });

    // MODERATE
    params[1] = ({
      header: harm.moderateHarm.header,
      footer: harm.moderateHarm.footer,
      name: harm.moderateHarm.header,
      maxSize: harm.moderateHarm.maxNbrOfData,
      hideIfEmpty: false
    });

    // MAJOR
    params[2] = ({
      header: harm.majorHarm.header,
      footer: harm.majorHarm.footer,
      name: harm.majorHarm.header,
      maxSize: harm.majorHarm.maxNbrOfData,
      hideIfEmpty: false
    });

    // FATAL
    params[3] = ({
      header: harm.fatalHarm.header,
      footer: harm.fatalHarm.footer,
      name: harm.fatalHarm.header,
      maxSize: harm.fatalHarm.maxNbrOfData,
      hideIfEmpty: true
    });

    return params;
  });

  protected armorTexts: Signal<string[]> = computed<string[]>(() => {
    const armor: ArmorModel = this.groupModel().armor;
    const arr: string[] = new Array<string>(3);

    arr[0] = armor.armor.text;
    arr[1] = armor.heavy.text;
    arr[2] = armor.special.text;

    return arr;
  });
  // #endregion

  // #region Form Group
  protected override buildFormGroup(): FormGroup {
    const harm: HarmModel = this.groupModel().harm;
    const armor: ArmorModel = this.groupModel().armor;

    const sectionGroup: FormGroup = this.formBuilder.group({
      stress: new FormControl<number>(this.groupModel().stress.marks),
      trauma: new FormGroup({
        selectedTraumaIndices: new FormControl<number[]>(this.groupModel().trauma.selectedTraumaIndices.slice()),
        selectedTraumaList: new FormControl<string[]>(this.groupModel().trauma.selectedTraumaList.slice())
      }),
      harm: new FormControl<string[][]>([harm.minorHarm.data.slice(), harm.moderateHarm.data.slice(), harm.majorHarm.data.slice(), harm.fatalHarm.data.slice()]),
      healing: new FormControl<number>(this.groupModel().healing.marks),
      armor: new FormControl<(boolean | null)[]>([armor.armor.checked, armor.heavy.checked, armor.special.checked])
    });

    sectionGroup.get("trauma.selectedTraumaIndices")!.valueChanges.subscribe((x: number[]) => { this.onSelectedIndicesChange(x) });

    return sectionGroup;
  }

  protected override updateFormValues(): void {
    const harm: HarmModel = this.groupModel().harm;
    const armor: ArmorModel = this.groupModel().armor;

    this.inputsGroup().patchValue({
      stress: this.groupModel().stress.marks,
      trauma: {
        selectedTraumaIndices: this.groupModel().trauma.selectedTraumaIndices.slice(),
        selectedTraumaList: this.groupModel().trauma.selectedTraumaList.slice()
      },
      harm: [harm.minorHarm.data.slice(), harm.moderateHarm.data.slice(), harm.majorHarm.data.slice(), harm.fatalHarm.data.slice()],
      healing: this.groupModel().healing.marks,
      armor: [armor.armor.checked, armor.heavy.checked, armor.special.checked]
    });
  }
  // #endregion

  // #region Trauma Syncing
  /**
   * When the select list changes, the component needs to sync the table items appropriately.
   * @param selectedIndices The selected indices from the select list.
   */
  protected onSelectedIndicesChange(selectedIndices: number[]): void {
    const valueList: string[] = this.groupModel().trauma.traumaList;

    // Use the selected indices to create the string list, in alphabetical order always.
    let newItems: string[] = selectedIndices.map((x: number, i: number, arr: number[]) => {
      return valueList[x];
    });

    this.inputsGroup().patchValue({
      trauma: {
        selectedTraumaList: newItems
      }
    });
  }
  // #endregion

  // #region Harm Table Processing

  // #endregion
}
