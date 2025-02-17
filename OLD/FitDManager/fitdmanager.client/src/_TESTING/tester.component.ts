import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, Signal, WritableSignal, effect, inject, signal } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Subject } from "rxjs";

//import { TestSectionApiModel, TestSectionComponent } from "./test-section/test-section.component";
//import { TestSectionSimpleComponent } from "./test-section-simple/test-section-simple.component";
import { EditButtonComponent, ResetButtonComponent } from "@app/shared/buttons";
import { BitdCharBasicInfo, BitdCharSheet } from "@app/sheet-viewer/bitd";
import { BitdCharBasicInfoSectionComponent } from "../app/sheet-viewer/bitd/sections/basic-info/bid-char-basic-info-section.component";


export interface BitdCharSheetSignal {
  basicInfo: WritableSignal<BitdCharBasicInfoSignal>;
}

export interface BitdCharBasicInfoSignal {
  name: WritableSignal<string>;
  alias: WritableSignal<string>;
  look: WritableSignal<string>;
  background: WritableSignal<TextSelectListComboSignal>;
  heritage: WritableSignal<TextSelectListComboSignal>;
  vice: WritableSignal<TextSelectListComboSignal>;
}

export interface TextSelectListComboSignal {
  text: WritableSignal<string>;
  valueList: WritableSignal<string[]>;
  selectedIndex: WritableSignal<number | null>;
}

@Component({
  selector: 'tester-component',
  templateUrl: 'tester.component.html',
  styleUrl: 'tester.component.scss',
  imports: [FormsModule, ReactiveFormsModule, EditButtonComponent, ResetButtonComponent, BitdCharBasicInfoSectionComponent],
  standalone: true
})
export class TesterComponent implements  OnInit, AfterViewChecked {
  // #region Services
  private formBuilder: FormBuilder = inject(FormBuilder);
  // #endregion
  public testForm!: FormGroup;
  public isEditable: WritableSignal<boolean> = signal<boolean>(false);

  //public apiModel: WritableSignal<BitdCharSheet> = signal<BitdCharSheet>(this.getDefaultApiModelService());
  public basicInfoSection: WritableSignal<BitdCharBasicInfo> = signal<BitdCharBasicInfo>(this.getDefaultApiModelService().basicInfo);
  //public apiModel!: BitdCharSheetSignal;

  public defaultApiModel!: BitdCharSheet;

  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
      test: new FormControl('')
    });

    // Creation of default api model will be done in the api service
    this.defaultApiModel = this.getDefaultApiModelService();

    //this.apiModel = this.getDefaultApiModelServiceSignal(this.defaultApiModel);

    //this.apiModel = {
    //  basicInfo: signal<BitdCharBasicInfoSignal>({
    //    name: signal<string>(''),
    //    alias: signal<string>(''),
    //    look: signal<string>(''),
    //    heritage: signal<TextSelectListComboSignal>({
    //      text: signal<string>(''),
    //      selectedIndex: signal<number | null>(null),
    //      valueList: signal<string[]>([])
    //    }),
    //    background: signal<TextSelectListComboSignal>({
    //      text: signal<string>(''),
    //      selectedIndex: signal<number | null>(null),
    //      valueList: signal<string[]>([])
    //    }),
    //    vice: signal<TextSelectListComboSignal>({
    //      text: signal<string>(''),
    //      selectedIndex: signal<number | null>(null),
    //      valueList: signal<string[]>([])
    //    }),
    //  })
    //};

    //this.setDefaultValues(this.defaultApiModel);
    this.copyDefaultModel();


  }

  constructor(private cd: ChangeDetectorRef) {
    effect(() => {
      console.log(`Updated Api Model Signal version`);
      //console.log(this.apiModel.basicInfo().name())
      //console.log(this.apiModel.basicInfo().heritage().text())
      //console.log(this.apiModel().basicInfo.name)
      //console.log(this.apiModel().basicInfo.heritage.text)
      console.log(this.basicInfoSection().name)
      console.log(this.basicInfoSection().heritage.text)
    });
  }

  ngAfterViewChecked() {
    //this.cd.detectChanges();
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

  protected setDefaultValues(sheet: BitdCharSheet): void {
    console.log(`Creating Default model`);
    //this.apiModel.basicInfo.set({
    //  name: signal<string>(sheet.basicInfo.name),
    //  alias: signal<string>(sheet.basicInfo.alias),
    //  look: signal<string>(sheet.basicInfo.look),
    //  heritage: signal<TextSelectListComboSignal>({
    //    text: signal<string>(sheet.basicInfo.heritage.text),
    //    selectedIndex: signal<number | null>(sheet.basicInfo.heritage.selectedIndex),
    //    valueList: signal<string[]>([...sheet.basicInfo.heritage.valueList])
    //  }),
    //  background: signal<TextSelectListComboSignal>({
    //    text: signal<string>(sheet.basicInfo.background.text),
    //    selectedIndex: signal<number | null>(sheet.basicInfo.background.selectedIndex),
    //    valueList: signal<string[]>([...sheet.basicInfo.background.valueList])
    //  }),
    //  vice: signal<TextSelectListComboSignal>({
    //    text: signal<string>(sheet.basicInfo.vice.text),
    //    selectedIndex: signal<number | null>(sheet.basicInfo.vice.selectedIndex),
    //    valueList: signal<string[]>([...sheet.basicInfo.vice.valueList])
    //  }),
    //});

    //this.apiModel.basicInfo.name.set(sheet.basicInfo.name);
    //this.apiModel.basicInfo.alias.set(sheet.basicInfo.alias);
    //this.apiModel.basicInfo.look.set(sheet.basicInfo.look);

    //this.apiModel.basicInfo.heritage.text.set(sheet.basicInfo.heritage.text);
    //this.apiModel.basicInfo.heritage.selectedIndex.set(sheet.basicInfo.heritage.selectedIndex);
    //this.apiModel.basicInfo.heritage.valueList.set([...sheet.basicInfo.heritage.valueList]); //shallow copy

    //this.apiModel.basicInfo.background.text.set(sheet.basicInfo.background.text);
    //this.apiModel.basicInfo.background.selectedIndex.set(sheet.basicInfo.background.selectedIndex);
    //this.apiModel.basicInfo.background.valueList.set([...sheet.basicInfo.background.valueList]); //shallow copy

    //this.apiModel.basicInfo.vice.text.set(sheet.basicInfo.vice.text);
    //this.apiModel.basicInfo.vice.selectedIndex.set(sheet.basicInfo.vice.selectedIndex);
    //this.apiModel.basicInfo.vice.valueList.set([...sheet.basicInfo.vice.valueList]); //shallow copy

    //let model: BitdCharSheetSignal = {
    //  basicInfo: {
    //    name: signal<string>(sheet.basicInfo.name),
    //    alias: signal<string>(sheet.basicInfo.alias),
    //    look: signal<string>(sheet.basicInfo.look),
    //    heritage: {
    //      text: signal<string>(sheet.basicInfo.heritage.text),
    //      selectedIndex: signal<number | null>(sheet.basicInfo.heritage.selectedIndex),
    //      valueList: signal<string[]>(sheet.basicInfo.heritage.valueList)
    //    },
    //    background: {
    //      text: signal<string>(sheet.basicInfo.background.text),
    //      selectedIndex: signal<number | null>(sheet.basicInfo.background.selectedIndex),
    //      valueList: signal<string[]>(sheet.basicInfo.background.valueList)
    //    },
    //    vice: {
    //      text: signal<string>(sheet.basicInfo.vice.text),
    //      selectedIndex: signal<number | null>(sheet.basicInfo.vice.selectedIndex),
    //      valueList: signal<string[]>(sheet.basicInfo.vice.valueList)
    //    },
    //  }
    //};

    //return model;
  }

  public onSetIsEditable(value: boolean): void {
    console.log(`Toggling Editable in Tester.`);
    this.isEditable.set(value);
    //this.setEditableEvent$.next(this.isEditable());

  }

  public resetToDefault(): void {
    if (!confirm('This will remove all changes to the sheet made before the last save. Are you sure?')) {
      return;
    }
    console.log(`Reseting to Default in Tester.`);
    //this.setDefaultValues(this.defaultApiModel);
    //this.apiModel = this.getDefaultApiModelServiceSignal(this.defaultApiModel);
    this.copyDefaultModel();
  }

  protected copyDefaultModel(): void {
    // Manually create a model based on an existing model
    // Can move to a model creation service
    //let model: BitdCharSheet = JSON.parse(JSON.stringify(this.defaultApiModel));
    //this.apiModel.set(model);
    //console.log(`Changed to default: ${JSON.stringify(this.apiModel())}`)

    let model: BitdCharBasicInfo = JSON.parse(JSON.stringify(this.defaultApiModel.basicInfo));
    this.basicInfoSection.set(model);
    console.log(`Changed to default: ${JSON.stringify(this.basicInfoSection())}`)
  }

  public saveForm(): void {
    console.log(this.testForm.controls);
    //console.log(this.apiModel);
    console.log(`API MODEL: ${JSON.stringify(this.basicInfoSection())}`);
    console.log(`This is the value: ${JSON.stringify(this.testForm.value)}`);
    console.log(`This is the raw data: ${JSON.stringify(this.testForm.getRawValue())}`);
  }
}




/*
NOTES: TODO LIST, THOUGHTS
- The component structure of a sheet can be split into three tiers:
  - Sheet - Global, represents the whole sheet. Creates the structure of sections, but defers details to them. Handles global logic, validation, and api handling.
    - Has four main functions:
      - Global Edit - To toggle edit for all fields in the sheet. It will use an observable stream to emit the event to the sections.
      - Global Reset - To reset all fields to default. It will use an observable stream to emit the event to the sections.
      - Save - To retrive all data and save it. It will get raw data from the form group, create an api model and send it through the api handler.
      - Global Validation - To validate cross-sectional data or logic. It will use an observable stream to emit errors to the appropriate sections.
        - It will require have methods bound to each sections' change output emitters. This way, the sheet knows of all changes made and can do validation as needed.
        - If an error is global, it does not need to pass the error to each section.
    - Also, takes in api data and sends api data. This can be separated out to a sheet api handler instead.
      - It will pass in member data from the api model to the appropriate sections.

  - Section - Local, represents a section of a sheet. Creates the input structure of the section, but defers details to the inputs. Handles local logic and validation.
    - Note: Sections can have subsections as children.
    - Input api data will be given as api sub models. It will pass data to its children appropriately.
    - It will take in the parent form group.
      - It creates its own section form group, and adds it to the parent group.
      - If there are any subsections, defer its creation to the subsections.
    - Section Edit - Toggles edit for the section only. Simply toggle on or off all of its form controls. May need to use an observable stream to emit the event to subsections.
    - Section Reset - Toggles reset for the section only. Use an observable stream to emit the event to its inputs.
    - Observables from Parent:
      - Global Edit - Same as section edit.
      - Global Reset - Same as section reset.
    - Sectional Validation - Any local validation for the inputs.
      - Section has on change method handlers for each input as needed. It will pass these onto the inputs on creation.
      - On each change, it needs to validate the new value.
      - Sections handle all but the very basic validations for the input.
  - Field - Inputs, representing a field of the sheet. Handles value changes and user interaction.
    - Reset: Resets to default. It will listen to an observable stream for an event.
    - It handles its own value state, and emits event when the value state changes.
    - Combo Fields are a combination of fields that act like a section-field hybrid.
      - They are inputs first and foremost, but they have multiple input elements. Their value state is a combination of the input values.
      - They do not have sectional logic, though they might do low-level local validation.
- The idea is that logic will be deferred to the lowest, most local point it can. If it requires context beyond its locality, it will defer to the parent.
  - The parent supplies initial data for the child to be created. This gets passed down the chain as needed til the bottom.
  - The parent will supply observable streams for the child to monitor whenever the parent needs to trigger an event for the child. This is how the parent can tell child information after initial creation.
  - The parent will supply methods for the child to trigger when a local event occurs. The child can notify the parent this way via Output emitters. This is how the child can inform the parent.
*/
