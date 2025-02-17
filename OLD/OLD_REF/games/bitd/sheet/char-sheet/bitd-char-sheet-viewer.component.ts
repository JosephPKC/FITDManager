// Core
import { Component, InputSignal, OnInit, WritableSignal, inject, input, signal } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

// App
import { BitdApiService } from "../../bitd-api.service";
import { BitdCharSheet } from "../sheet-model/bitd-char-sheet";

/*
- The sheet viewer feature enables the user to view character and crew sheets, edit them as they see fit, and then save it.
- The sheet viewer retrieves a sheet model from api, and builds out a sheet form group that will be displayed to the user.
- The sheet form group is the primary interface between the user and the sheet model.
- When the sheet is saved, the sheet model is updated and pushed to api.
*/
@Component({
  selector: 'bitd-char-sheet-viewer',
  templateUrl: 'bitd-char-sheet-viewer.component.html',
  styleUrl: 'bitd-char-sheet-viewer.component.scss'
})
export class BitdCharSheetViewerComponent implements OnInit {
  // #region Services
  private readonly api: BitdApiService = inject(BitdApiService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  // #endregion

  // #region Inputs
  public sheetId: InputSignal<string> = input.required<string>();
  // #endregion

  public defaultSheetData: BitdCharSheet | null = null;
  public sheetForm!: FormGroup;

  public isSheetLoaded: WritableSignal<boolean> = signal(false);
  public isSheetSaving: WritableSignal<boolean> = signal(false);

  // #region Test Values (to be eventually gotten via Api)


  // #endregion

  // #region Lifecycyle
  ngOnInit() {
    this.getSheetDataFromApi();

    this.sheetForm = this.buildSheetFormGroup();
  }
  // #endregion

  // #region Controls
  public onSubmitSaveSheet(): void {
    const sheet: BitdCharSheet = this.getSheetFromForm();
    this.putSheetDataToApi(sheet);
  }

  public onUpdateSheet(): void {
    // This forces update on all of its sections? How?
    //- Options, a bound flag that, when true, will cause the section to overwrite current values with the default sheet.
    //- ViewChild to directly call its loading function.
  }
  // #endregion

  private buildSheetFormGroup(): FormGroup {
    return this.formBuilder.group({});
  }

  private getSheetFromForm(): BitdCharSheet {
    const sheetRawData: string = JSON.stringify(this.sheetForm.getRawValue());
    return JSON.parse(sheetRawData) as BitdCharSheet;
  }

  // #region Api
  private getSheetDataFromApi(): void {
    this.isSheetLoaded.set(false);

    this.api.getCharSheet(this.sheetId()).subscribe(
      data => {
        this.defaultSheetData = data;
        this.isSheetLoaded.set(true);
      }
    );
  }

  private putSheetDataToApi(sheet: BitdCharSheet): void {
    this.isSheetSaving.set(true);

    this.api.putCharSheet(this.sheetId(), sheet).subscribe(
      data => {
        this.isSheetSaving.set(false);
      }
    );
  }
  // #endregion
}
