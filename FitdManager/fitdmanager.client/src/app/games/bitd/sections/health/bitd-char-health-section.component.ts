import { Component, signal, WritableSignal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { BitdCharHealth } from "@games/bitd/models";
import { TrackInputComponent } from "@sheet/inputs";
import { BaseSectionDirective, SectionShellComponent, SelectTableComponent } from "@sheet/sections";

@Component({
  selector: "bitd-char-health-section",
  templateUrl: "bitd-char-health-section.component.html",
  styleUrl: "bitd-char-health-section.component.scss",
  imports: [ReactiveFormsModule, SectionShellComponent, SelectTableComponent, TrackInputComponent],
  standalone: true
})
export class BitdCharHealthSectionComponent extends BaseSectionDirective<BitdCharHealth> {
  // #region Internals
  protected shouldShowControls: WritableSignal<boolean> = signal<boolean>(!this.locked());
  // #endregion

  // #region Form Group
  protected override buildFormGroup(): FormGroup {
    const sectionGroup: FormGroup = this.formBuilder.group({
      stress: new FormControl<number>(this.groupModel().stress.marks)
    });

    return sectionGroup;
  }

  protected override updateFormValues(): void {
    this.inputsGroup().patchValue({
      stress: this.groupModel().stress.marks
    });
  }
  // #endregion

  // #region Section Lock Processing
  protected onSectionLockChange(val: boolean): void {
    // Set the signal, so that it can inform the appropriate inputs.
    this.shouldShowControls.set(!val);
  }
  // #endregion
}
