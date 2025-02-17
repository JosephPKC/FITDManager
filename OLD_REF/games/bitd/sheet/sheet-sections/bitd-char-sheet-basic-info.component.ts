// Core
import { Component, InputSignal, OnInit, WritableSignal, inject, input, signal } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

// App
import { BitdApiService } from "../../bitd-api.service";
import { BitdCharSheet } from "../sheet-model/bitd-char-sheet";

/*
- The basic info section contains basic info, including: name, alias, look, background, heritage, vice.
*/
@Component({
  selector: 'bitd-char-sheet-basic-info',
  templateUrl: 'bitd-char-sheet-viewer.component.html',
  styleUrl: 'bitd-char-sheet-viewer.component.scss'
})
export class BitdCharSheetBasicInfoComponent {
  public defaultSheetData: InputSignal<BitdCharSheet> = input.required<BitdCharSheet>();
}
