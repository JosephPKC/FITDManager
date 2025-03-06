import { Component, computed, signal, Signal, WritableSignal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { BitdCharHealthModel } from "@games/bitd/models";
import { HarmModel } from "@sheet/models";
import { TableParams, MultiSelectInputComponent, MultiTableInputComponent, TrackInputComponent, ViewTableInputComponent } from "@sheet/inputs";
import { BaseSectionDirective, SectionShellComponent } from "@sheet/sections";

@Component({
  selector: "bitd-char-health-section",
  templateUrl: "bitd-char-health-section.component.html",
  styleUrl: "bitd-char-health-section.component.scss",
  imports: [ReactiveFormsModule, SectionShellComponent, MultiSelectInputComponent, MultiTableInputComponent, TrackInputComponent, ViewTableInputComponent],
  standalone: true
})
export class BitdCharHealthSectionComponent extends BaseSectionDirective<BitdCharHealthModel> {
  // #region State
  protected shouldShowControls: WritableSignal<boolean> = signal<boolean>(!this.locked());
  // #endregion

  // #region Computes
  protected harmTableParams: Signal<TableParams[]> = computed<TableParams[]>(() => {
    const harm: HarmModel = this.groupModel().harm;
    let params: TableParams[] = new Array<TableParams>(3);

    // MINOR
    params[0] = ({
      header: harm.minorHarm.header,
      footer: harm.minorHarm.footer,
      name: harm.minorHarm.header,
      maxNbrOfItems: harm.minorHarm.maxNbrOfData,
      enforceUnique: true
    });

    // MODERATE
    params[1] = ({
      header: harm.moderateHarm.header,
      footer: harm.moderateHarm.footer,
      name: harm.moderateHarm.header,
      maxNbrOfItems: harm.moderateHarm.maxNbrOfData,
      enforceUnique: true
    });

    // MAJOR
    params[2] = ({
      header: harm.majorHarm.header,
      footer: harm.majorHarm.footer,
      name: harm.majorHarm.header,
      maxNbrOfItems: harm.majorHarm.maxNbrOfData,
      enforceUnique: true
    });

    console.log(`PARAMS: ${params}.`);
    return params;
  });
  // #endregion

  // #region Form Group
  protected override buildFormGroup(): FormGroup {
    const harm: HarmModel = this.groupModel().harm;

    const sectionGroup: FormGroup = this.formBuilder.group({
      stress: new FormControl<number>(this.groupModel().stress.marks),
      trauma: new FormGroup({
        selectedTraumaIndices: new FormControl<number[]>(this.groupModel().trauma.selectedTraumaIndices.slice()),
        selectedTraumaList: new FormControl<string[]>(this.groupModel().trauma.selectedTraumaList.slice())
      }),
      harm: new FormControl<string[][]>([harm.minorHarm.data.slice(), harm.moderateHarm.data.slice(), harm.majorHarm.data.slice()])
    });

    sectionGroup.get("trauma.selectedTraumaIndices")!.valueChanges.subscribe((x: number[]) => { this.onSelectedIndicesChange(x) });

    return sectionGroup;
  }

  protected override updateFormValues(): void {
    const harm: HarmModel = this.groupModel().harm;

    this.inputsGroup().patchValue({
      stress: this.groupModel().stress.marks,
      trauma: {
        selectedTraumaIndices: this.groupModel().trauma.selectedTraumaIndices.slice(),
        selectedTraumaList: this.groupModel().trauma.traumaList.slice()
      },
      harm: [harm.minorHarm.data.slice(), harm.moderateHarm.data.slice(), harm.majorHarm.data.slice()]
    });
  }
  // #endregion

  // #region Section Lock Processing
  protected onSectionLockChange(val: boolean): void {
    // Set the signal, so that it can inform the appropriate inputs.
    this.shouldShowControls.set(!val);
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
        itemTableList: newItems
      }
    });
  }
  // #endregion

  // #region Harm Table Processing

  // #endregion
}
