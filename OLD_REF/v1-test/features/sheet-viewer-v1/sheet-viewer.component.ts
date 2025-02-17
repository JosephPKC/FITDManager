//import { Component, OnInit, WritableSignal, inject, signal } from "@angular/core";
//import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

//// Services
//import { ApiService } from "../../../app/core/api/api.service";
//import { SheetFormBuilderService } from "./sheet-form/sheet-form-builder.service";

//// Models
//import { BitdCharSheet } from "../../../app/games/bitd/sheet/sheet-model/bitd-char-sheet";
//import { SheetFormElementBase } from "./sheet-form/elements/sheet-form-element-base";
//import { SheetFormTextField } from "./sheet-form/elements/sheet-form-text-field";

//@Component({
//  selector: 'sheet-viewer',
//  templateUrl: 'sheet-viewer.component.html',
//  styleUrl: 'sheet-viewer.component.scss'
//})
//export class SheetViewerComponent implements OnInit {
//  // #region Dependencies
//  private readonly api: ApiService = inject(ApiService);
//  private readonly sfBuilder: SheetFormBuilderService = inject(SheetFormBuilderService);
//  // #endregion

//  // #region Sheet Data
//  public sheetId: string = 'test0'; // TODO: FOR TESTING ONLY

//  public sheet: WritableSignal<BitdCharSheet> = signal(new BitdCharSheet());
//  public isSheetLoaded: boolean = false;

//  public sheetForm!: FormGroup;
//  public sheetFields: SheetFormElementBase<string>[] = [
//    new SheetFormTextField({
//      name: 'crewName',
//      label: 'Crew Name: ',
//      elementId: 'sfe-crew-name',
//      order: 1
//    }),
//    new SheetFormTextField({
//      name: 'name',
//      label: 'Name: ',
//      elementId: 'sfe-name',
//      order: 2
//    }),
//    new SheetFormTextField({
//      name: 'alias',
//      label: 'Alias: ',
//      elementId: 'sfe-alias',
//      order: 3
//    }),
//    new SheetFormTextField({
//      name: 'look',
//      label: 'Look: ',
//      elementId: 'sfe-look',
//      order: 4
//    })
//  ];

//  public traumaDefaults: string[] = [
//    'COLD', 'HAUNTED', 'OBSESSED', 'PARANOID',
//    'RECKLESS', 'SOFT', 'UNSTABLE', 'VICIOUS'
//  ];

//  public maxTrauma: number = 4;
//  // #endregion

//  constructor() {}

//  ngOnInit() {
//    const orderedSheetFields = this.sheetFields.sort((x, y) => x.order - y.order);
//    this.sheetForm = this.getSheetForm(orderedSheetFields);
//    this.fetchSheetDataFromApi();
//  }

//  // #region Sheet Form Building
//  private getSheetForm(template: SheetFormElementBase<string>[]): FormGroup {
//    return this.sfBuilder.createFormGroup(template);
//  }

//  private updateSheetForm(): void {
//    //this.sheetForm.get('crewName')?.setValue(this.sheet().crewName);
//    //this.sheetForm.get('name')?.setValue(this.sheet().name);
//    //this.sheetForm.get('alias')?.setValue(this.sheet().alias);
//    //this.sheetForm.get('look')?.setValue(this.sheet().look);
//    this.sheetForm.patchValue({
//      crewName: this.sheet().crewName,
//      name: this.sheet().name,
//      alias: this.sheet().alias,
//      look: this.sheet().look
//    });
//  }
//  // #endregion
 


//}
