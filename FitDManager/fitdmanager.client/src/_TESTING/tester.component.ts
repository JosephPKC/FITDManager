import {
  AfterViewChecked, ChangeDetectorRef, Component, OnInit, WritableSignal,
  effect, inject, signal
} from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LockButtonComponent, ResetButtonComponent } from "@shared/buttons";
import { BitdCharSheetModel } from "@games/bitd/models";
import { BitdCharActionSectionComponent, BitdCharBasicInfoSectionComponent, BitdCharCoinSectionComponent, BitdCharHealthSectionComponent } from "@games/bitd/sections";

@Component({
  selector: "tester",
  templateUrl: "tester.component.html",
  styleUrl: "tester.component.scss",
  imports: [FormsModule, ReactiveFormsModule, LockButtonComponent, ResetButtonComponent, BitdCharActionSectionComponent, BitdCharBasicInfoSectionComponent, BitdCharCoinSectionComponent, BitdCharHealthSectionComponent],
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
        },
        armor: {
          armor: {
            text: "ARMOR",
            checked: true
          },
          heavy: {
            text: "HEAVY",
            checked: false
          },
          special: {
            text: "SPECIAL",
            checked: null
          }
        }
      },
      action: {
        playbookXp: {
          boxes: 8,
          marks: 0,
          minMarks: 0
        },
        insight: {
          name: "INSIGHT",
          rating: 0,
          xp: {
            boxes: 6,
            marks: 2,
            minMarks: 0
          },
          actions: [
            {
              name: "HUNT",
              rating: {
                boxes: 4,
                marks: 0,
                minMarks: 0
              }
            },
            {
              name: "STUDY",
              rating: {
                boxes: 4,
                marks: 0,
                minMarks: 0
              }
            },
            {
              name: "SURVEY",
              rating: {
                boxes: 4,
                marks: 0,
                minMarks: 0
              }
            },
            {
              name: "TINKER",
              rating: {
                boxes: 4,
                marks: 0,
                minMarks: 0
              }
            }
          ]
        },
        prowess: {
          name: "PROWESS",
          rating: 3,
          xp: {
            boxes: 6,
            marks: 4,
            minMarks: 0
          },
          actions: [
            {
              name: "FINESSE",
              rating: {
                boxes: 4,
                marks: 2,
                minMarks: 0
              }
            },
            {
              name: "PROWL",
              rating: {
                boxes: 4,
                marks: 1,
                minMarks: 0
              }
            },
            {
              name: "SKIRMISH",
              rating: {
                boxes: 4,
                marks: 1,
                minMarks: 0
              }
            },
            {
              name: "WRECK",
              rating: {
                boxes: 4,
                marks: 0,
                minMarks: 0
              }
            }
          ]
        },
        resolve: {
          name: "RESOLVE",
          rating: 1,
          xp: {
            boxes: 6,
            marks: 0,
            minMarks: 0
          },
          actions: [
            {
              name: "ATTUNE",
              rating: {
                boxes: 4,
                marks: 3,
                minMarks: 0
              }
            },
            {
              name: "COMMAND",
              rating: {
                boxes: 4,
                marks: 0,
                minMarks: 0
              }
            },
            {
              name: "CONSORT",
              rating: {
                boxes: 4,
                marks: 0,
                minMarks: 0
              }
            },
            {
              name: "SWAY",
              rating: {
                boxes: 4,
                marks: 0,
                minMarks: 0
              }
            }
          ]
        }
      },
      coin: {
        coin: {
          boxes: 4,
          marks: 1,
          minMarks: 0
        },
        stash: 15
      }
    };

    return model;
  }

  protected copyModel<T>(oldModel: T): T {
    let model: T = JSON.parse(JSON.stringify(oldModel));
    return model;
  }
}

