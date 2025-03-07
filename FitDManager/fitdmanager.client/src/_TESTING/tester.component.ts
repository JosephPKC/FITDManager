import {
  AfterViewChecked, ChangeDetectorRef, Component, OnInit, WritableSignal,
  effect, inject, signal
} from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LockButtonComponent, ResetButtonComponent } from "@shared/buttons";
import { BitdCharBasicModel, BitdCharHealthModel, BitdCharSheetModel } from "@games/bitd/models";
import { BitdCharBasicInfoSectionComponent, BitdCharHealthSectionComponent } from "@games/bitd/sections";

@Component({
  selector: "tester",
  templateUrl: "tester.component.html",
  styleUrl: "tester.component.scss",
  imports: [FormsModule, ReactiveFormsModule, LockButtonComponent, ResetButtonComponent, BitdCharBasicInfoSectionComponent, BitdCharHealthSectionComponent],
  standalone: true
})
export class TesterComponent implements  OnInit, AfterViewChecked {
  // #region Services
  private formBuilder: FormBuilder = inject(FormBuilder);
  // #endregion

  // #region State
  public testForm: WritableSignal<FormGroup>; // This is the form, structured like the model. It is the current model.
  public apiModel: WritableSignal<BitdCharSheetModel>; // This is the default model from the api

  public locked: WritableSignal<boolean> = signal<boolean>(true);
  // #endregion

  constructor(private cd: ChangeDetectorRef) {
    this.testForm = signal<FormGroup>(this.formBuilder.group({}));
    
    // Get default api model from api service
    this.apiModel = signal<BitdCharSheetModel>(this.getDefaultApiModelService());

    effect(() => {
      console.log(`Updated Api Model`);
      console.log(this.apiModel().basic.name)
      //console.log(this.apiModel().basicInfo.heritage.text)
    });
  }

  ngOnInit(): void {
    
  }


  ngAfterViewChecked() {
    //this.cd.detectChanges();
  }

  public onClickLock(locked: boolean): void {
    console.log(`Toggling Editable in Tester.`);
    this.locked.set(locked);
  }

  public onClickReset(): void {
    if (!confirm("This will remove all changes to the sheet made before the last save. Are you sure?")) {
      return;
    }
    console.log(`Reseting to Default in Tester.`);
    this.apiModel.set(this.copyModel(this.apiModel()));
  }

  public onClickSave(): void {
    console.log(`API MODEL: ${JSON.stringify(this.apiModel())}`);
    console.log(`This is the value: ${JSON.stringify(this.testForm().value)}`);
    console.log(`This is the raw data: ${JSON.stringify(this.testForm().getRawValue())}`);
  }

  public onChangeModel(basicInfo: BitdCharBasicModel) {
    console.log(`NEW MODEL IN TESTER: ${JSON.stringify(basicInfo)}`);
    //let model: BitdCharSheet = {
    //  basicInfo: this.copyModel(basicInfo)
    //}
    //this.apiModel.set(model);
  }

  protected getDefaultApiModelService(): BitdCharSheetModel {
    let model: BitdCharSheetModel = {
      basic: {
        name: "STAZIA",
        alias: "THE DUCK",
        look: "DUCK-LIKE",
        heritage: {
          text: "AKOROSI NOBLE FAMILY",
          selectedIndex: 0,
          valueList: ["AKOROS", "THE DAGGER ISLES", "IRUVIA", "SEVEROS", "SKOVLAN", "TYCHEROS"]
        },
        background: {
          text: "SALVAGING COMPANY",
          selectedIndex: 1,
          valueList: ["ACADEMIC", "LABOR", "LAW", "TRADE", "MILITARY", "NOBLE", "UNDERWORLD"]
        },
        vice: {
          text: "",
          selectedIndex: null,
          valueList: ["FAITH", "GAMBLING", "LUXURY", "OBLIGATION", "PLEASURE", "STUPOR", "WEIRD"]
        }
      },
      health: {
        stress: {
          boxes: 8,
          marks: 2,
          minMarks: 0
        },
        trauma: {
          traumaList: ["COLD", "HAUNTED", "OBSESSED", "PARANOID", "RECKLESS", "SOFT", "UNSTABLE", "VICIOUS"],
          selectedTraumaIndices: [0, 1],
          selectedTraumaList: ["COLD", "HAUNTED"],
          maxNbrOfTrauma: 3
        },
        harm: {
          minorHarm: {
            header: "MINOR",
            footer: "REDUCED EFFECT",
            data: ["DISTRESSED"],
            maxNbrOfData: 2
          },
          moderateHarm: {
            header: "MODERATE",
            footer: "-1D",
            data: [],
            maxNbrOfData: 2
          },
          majorHarm: {
            header: "MAJOR",
            footer: "CANNOT ACT",
            data: ["BROKEN LEG"],
            maxNbrOfData: 1
          },
          fatalHarm: {
            header: "FATAL",
            footer: "PERMANENT",
            data: [],
            maxNbrOfData: 1
          },
          examples: "BATTERED, DRAINED, CONFUSED"
        },
        healing: {
          boxes: 4,
          marks: 0,
          minMarks: 1
        }
      }
    };

    return model;
  }

  protected copyModel<T>(oldModel: T): T {
    let model: T = JSON.parse(JSON.stringify(oldModel));
    return model;
  }
}

