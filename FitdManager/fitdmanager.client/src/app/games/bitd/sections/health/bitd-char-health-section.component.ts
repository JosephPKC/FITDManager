import { Component, computed, signal, Signal, WritableSignal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { BitdCharHealth, CharHarm } from "@games/bitd/models";
import { TrackInputComponent } from "@sheet/inputs";
import { TableParams, MultiSelectInputComponent, MultiTableInputComponent, ViewTableInputComponent } from "@sheet/inputs";
import { BaseSectionDirective, SectionShellComponent } from "@sheet/sections";

@Component({
  selector: "bitd-char-health-section",
  templateUrl: "bitd-char-health-section.component.html",
  styleUrl: "bitd-char-health-section.component.scss",
  imports: [ReactiveFormsModule, SectionShellComponent, MultiSelectInputComponent, MultiTableInputComponent, TrackInputComponent, ViewTableInputComponent],
  standalone: true
})
export class BitdCharHealthSectionComponent extends BaseSectionDirective<BitdCharHealth> {
  // #region State
  protected shouldShowControls: WritableSignal<boolean> = signal<boolean>(!this.locked());
  // #endregion

  // #region Computes
  protected harmTableParams: Signal<TableParams[]> = computed<TableParams[]>(() => {
    const harm: CharHarm = this.groupModel().harm;
    let params: TableParams[] = new Array<TableParams>(3);

    // MINOR
    params[0] = ({
      header: harm.minorHeader,
      footer: harm.minorFooter,
      name: harm.minorHeader,
      maxNbrOfItems: harm.minorHarm.maxNbrOfItems,
      enforceUnique: true
    });

    // MODERATE
    params[1] = ({
      header: harm.moderateHeader,
      footer: harm.moderateFooter,
      name: harm.moderateHeader,
      maxNbrOfItems: harm.moderateHarm.maxNbrOfItems,
      enforceUnique: true
    });

    // MAJOR
    params[2] = ({
      header: harm.majorHeader,
      footer: harm.majorFooter,
      name: harm.majorHeader,
      maxNbrOfItems: harm.majorHarm.maxNbrOfItems,
      enforceUnique: true
    });

    console.log(`PARAMS: ${params}.`);
    return params;
  });
  // #endregion

  // #region Form Group
  protected override buildFormGroup(): FormGroup {
    const harm: CharHarm = this.groupModel().harm;

    const sectionGroup: FormGroup = this.formBuilder.group({
      stress: new FormControl<number>(this.groupModel().stress.marks),
      trauma: new FormGroup({
        selectedIndices: new FormControl<number[]>(this.groupModel().trauma.selectedIndices.slice()),
        itemTableList: new FormControl<string[]>(this.groupModel().trauma.itemTableList.slice())
      }),
      harm: new FormControl<string[][]>([harm.minorHarm.items.slice(), harm.moderateHarm.items.slice(), harm.majorHarm.items.slice()])
    });

    sectionGroup.get("trauma.selectedIndices")!.valueChanges.subscribe((x: number[]) => { this.onSelectedIndicesChange(x) });

    return sectionGroup;
  }

  protected override updateFormValues(): void {
    const harm: CharHarm = this.groupModel().harm;

    this.inputsGroup().patchValue({
      stress: this.groupModel().stress.marks,
      trauma: {
        selectedIndices: this.groupModel().trauma.selectedIndices.slice(),
        itemTableList: this.groupModel().trauma.itemTableList.slice()
      },
      harm: [harm.minorHarm.items.slice(), harm.moderateHarm.items.slice(), harm.majorHarm.items.slice()]
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
    const valueList: string[] = this.groupModel().trauma.valueList;

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
