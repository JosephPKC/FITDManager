import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, WritableSignal, effect, inject, signal } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LockButtonComponent, ResetButtonComponent } from "@shared/buttons";
import { BitdCharBasicInfo, BitdCharSheet } from "@games/bitd/models";
import { BitdCharBasicInfoSectionComponent } from "@games/bitd/sections";

@Component({
  selector: 'tester',
  templateUrl: 'tester.component.html',
  styleUrl: 'tester.component.scss',
  imports: [FormsModule, ReactiveFormsModule, LockButtonComponent, ResetButtonComponent, BitdCharBasicInfoSectionComponent],
  standalone: true
})
export class TesterComponent implements  OnInit, AfterViewChecked {
  // #region Services
  private formBuilder: FormBuilder = inject(FormBuilder);
  // #endregion

  // #region State
  public testForm: WritableSignal<FormGroup>;
  public apiModel: WritableSignal<BitdCharSheet>;
  public defaultApiModel: BitdCharSheet;

  public locked: WritableSignal<boolean> = signal<boolean>(true);
  // #endregion

  constructor(private cd: ChangeDetectorRef) {
    this.testForm = signal<FormGroup>(this.formBuilder.group({}));

    // Get default api model from api service
    this.defaultApiModel = this.getDefaultApiModelService();
    this.apiModel = signal<BitdCharSheet>(this.copyDefaultModel());

    effect(() => {
      console.log(`Updated Api Model`);
      console.log(this.apiModel().basicInfo.name)
      console.log(this.apiModel().basicInfo.heritage.text)
    });
  }

  ngOnInit(): void {
    this.copyDefaultModel();
  }


  ngAfterViewChecked() {
    //this.cd.detectChanges();
  }

  public onClickLock(locked: boolean): void {
    console.log(`Toggling Editable in Tester.`);
    this.locked.set(locked);
  }

  public onClickReset(): void {
    if (!confirm('This will remove all changes to the sheet made before the last save. Are you sure?')) {
      return;
    }
    console.log(`Reseting to Default in Tester.`);
    this.apiModel.set(this.copyDefaultModel());
  }

  public onClickSave(): void {
    console.log(`API MODEL: ${JSON.stringify(this.apiModel())}`);
    console.log(`This is the value: ${JSON.stringify(this.testForm().value)}`);
    console.log(`This is the raw data: ${JSON.stringify(this.testForm().getRawValue())}`);
  }

  protected getDefaultApiModelService(): BitdCharSheet {
    let model: BitdCharSheet = {
      basicInfo: {
        name: 'STAZIA',
        alias: 'THE DUCK',
        look: 'DUCK-LIKE',
        heritage: {
          text: 'AKOROSI NOBLE FAMILY',
          selectedIndex: 0,
          valueList: ['AKOROS', 'THE DAGGER ISLES', 'IRUVIA', 'SEVEROS', 'SKOVLAN', 'TYCHEROS']
        },
        background: {
          text: 'SALVAGING COMPANY',
          selectedIndex: 1,
          valueList: ['ACADEMIC', 'LABOR', 'LAW', 'TRADE', 'MILITARY', 'NOBLE', 'UNDERWORLD']
        },
        vice: {
          text: '',
          selectedIndex: null,
          valueList: ['FAITH', 'GAMBLING', 'LUXURY', 'OBLIGATION', 'PLEASURE', 'STUPOR', 'WEIRD']
        }
      }
    };

    return model;
  }

  protected copyDefaultModel(): BitdCharSheet {
    let model: BitdCharSheet = JSON.parse(JSON.stringify(this.defaultApiModel));
    return model;
  }
}

