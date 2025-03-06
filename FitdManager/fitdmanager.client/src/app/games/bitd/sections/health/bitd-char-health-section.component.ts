import { Component, computed, signal, Signal, WritableSignal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { BitdCharHealth, CharHarm } from "@games/bitd/models";
import { TrackInputComponent } from "@sheet/inputs";
import { Table, TableParams, MultiTableInputComponent } from "@sheet/inputs";
import { BaseSectionDirective, SectionShellComponent, SelectTableComponent } from "@sheet/sections";

@Component({
  selector: "bitd-char-health-section",
  templateUrl: "bitd-char-health-section.component.html",
  styleUrl: "bitd-char-health-section.component.scss",
  imports: [ReactiveFormsModule, SectionShellComponent, SelectTableComponent, TrackInputComponent, MultiTableInputComponent],
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
      harm: new FormControl<string[][]>([harm.minorHarm.items.slice(), harm.moderateHarm.items.slice(), harm.majorHarm.items.slice()])
    });

    return sectionGroup;
  }

  protected override updateFormValues(): void {
    const harm: CharHarm = this.groupModel().harm;

    this.inputsGroup().patchValue({
      stress: this.groupModel().stress.marks,
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

  // #region Harm Table Processing

  // #endregion
}
