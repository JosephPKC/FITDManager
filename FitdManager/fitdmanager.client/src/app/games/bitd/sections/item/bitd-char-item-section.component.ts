import {
  Component, InputSignalWithTransform,
  Signal,
  WritableSignal,
  booleanAttribute, computed, input,
  linkedSignal,
  signal
} from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { SelectTableInputComponent, ViewTableInputComponent } from "@sheet/inputs";
import { AbilityModel } from "@sheet/models";
import { BaseInputGroupDirective, BaseSectionDirective, SectionShellComponent } from "@sheet/sections";
import { BitdCharAbilityModel } from "@games/bitd/models";
import { HideButtonComponent } from "../../../../shared/buttons";
import { BitdCharItemModel, ItemModel, LoadoutState } from "../../models/bitd-char-item.model";
import { AddTableInputComponent } from "../../../../sheet/inputs/table/add-table-input.component";

@Component({
  selector: "bitd-char-item-section",
  templateUrl: "bitd-char-item-section.component.html",
  styleUrl: "bitd-char-item-section.component.scss",
  imports: [ReactiveFormsModule, SelectTableInputComponent, ViewTableInputComponent, SectionShellComponent, AddTableInputComponent],
  standalone: true
})
export class BitdCharItemSectionComponent extends BaseSectionDirective<BitdCharItemModel> {
  protected isLockedIn: WritableSignal<boolean> = linkedSignal<boolean>(() => {
    return this.groupModel().selectedGear.length > 0;
  });

  protected selectedGearNames: WritableSignal<string[]> = linkedSignal<string[]>(() => {
    return this.selectedGear().map((v, i, arr) => `${v.boxes} ${v.name}`);
  });

  protected selectedGear: WritableSignal<ItemModel[]> = linkedSignal<ItemModel[]>(() => {
    return this.deepCopyArr(this.groupModel().selectedGear);
  });

  protected loadoutVals: WritableSignal<number[]> = linkedSignal<number[]>(() => {
    const arr: number[] = new Array<number>(4);
    arr[0] = this.groupModel().loadout.none;
    arr[1] = this.groupModel().loadout.light;
    arr[2] = this.groupModel().loadout.normal;
    arr[3] = this.groupModel().loadout.heavy;
    return arr;
  });

  protected loadoutStateTentative: WritableSignal<LoadoutState> = signal<LoadoutState>(LoadoutState.None);

  protected loadoutState: WritableSignal<LoadoutState> = linkedSignal<LoadoutState>(() => {
    return this.groupModel().loadout.state;
  });

  protected loadout: WritableSignal<number> = linkedSignal<number>(() => {
    let loadoutVal: number = this.getLoadoutNbrFromState(this.loadoutState());
    const origVal: number = loadoutVal;
    for (let i = 0; i < this.selectedGear().length; i++) {
      loadoutVal -= this.selectedGear()[i].boxes;
    }

    if (loadoutVal < 0) {
      throw `Loadout State ${this.loadoutState()} with value ${origVal} is not enough for the selected gear. Current loadout val: ${loadoutVal}.`;
    }

    return loadoutVal;
  });

  protected isAbleToAdd: Signal<boolean> = computed<boolean>(() => {
    return this.isLockedIn() && this.loadout() > 0;
  });

  protected isLoadoutStateSelected: Signal<boolean[]> = computed<boolean[]>(() => {
    const arr: boolean[] = new Array<boolean>(4).fill(false);

    arr[this.loadoutState()] = true;

    return arr;
  });

  // #region BaseSectionDirective
  protected buildFormGroup(): FormGroup {
    const group: FormGroup = this.formBuilder.group({
      none: new FormControl<number>(this.groupModel().loadout.none),
      light: new FormControl<number>(this.groupModel().loadout.light),
      normal: new FormControl<number>(this.groupModel().loadout.normal),
      heavy: new FormControl<number>(this.groupModel().loadout.heavy),
      selectedGear: new FormControl<string[]>(this.selectedGearNames()),
      playbookGear: new FormControl<ItemModel[]>(this.groupModel().playbookGear)
    });


    return group;
  }

  protected updateFormValues(): void {
    this.inputsGroup().patchValue({
      none: this.groupModel().loadout.none,
      light: this.groupModel().loadout.light,
      normal: this.groupModel().loadout.normal,
      heavy: this.groupModel().loadout.heavy,
      selectedGear: this.selectedGearNames(),
      playbookGear: this.groupModel().playbookGear
    });
  }
  // #endregion

  protected getLoadoutNbrFromState(state: LoadoutState): number {
    switch (state) {
      case LoadoutState.None: {
        return this.loadoutVals()[0];
      }
      case LoadoutState.Light: {
        return this.loadoutVals()[1];
      }
      case LoadoutState.Normal: {
        return this.loadoutVals()[2];
      }
      case LoadoutState.Heavy: {
        return this.loadoutVals()[3];
      }
      default: {
        return 0;
      }
    }
  }

  protected onLoadoutChange(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const val: string = element.value;

    switch (val) {
      case "none": {
        this.loadoutStateTentative.set(LoadoutState.None);
        break;
      }
      case "light": {
        this.loadoutStateTentative.set(LoadoutState.Light);
        break;
      }
      case "normal": {
        this.loadoutStateTentative.set(LoadoutState.Normal);
        break;
      }
      case "heavy": {
        this.loadoutStateTentative.set(LoadoutState.Heavy);
        break;
      }
      default: {
        this.loadoutStateTentative.set(LoadoutState.None);
        break;
      }
    }
  }

  protected onLockInLoadout(): void {
    // Clear out the selected gear
    this.loadoutState.set(this.loadoutStateTentative());
    this.loadoutStateTentative.set(LoadoutState.None);
   
    this.isLockedIn.set(true);
  }

  protected onReset(): void {
    this.selectedGear.set([]);
    this.inputsGroup().patchValue({
      selectedGear: this.selectedGearNames()
    });
    this.isLockedIn.set(false);
  }

  protected onLoadoutValChange(index: number, event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const val: number = Number.parseInt(element.value);

    const arr: number[] = this.loadoutVals().slice();
    arr[index] = val;
    this.loadoutVals.set(arr);
  }

  protected onPlaybookGearClick(item: ItemModel): void {
    // Add to the selected gear
    const newItemsList: ItemModel[] = this.deepCopyArr(this.selectedGear());
    newItemsList.push({
      name: item.name,
      boxes: item.boxes
    });

    this.selectedGear.set(newItemsList);
    this.inputsGroup().patchValue({
      selectedGear: this.selectedGearNames()
    });
  }

  protected deepCopyArr(arr: ItemModel[]): ItemModel[] {
    return arr.map((v, i, arr) => {
      return {
        name: v.name,
        boxes: v.boxes
      };
    });
  }
}
