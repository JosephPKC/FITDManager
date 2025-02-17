// Core
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// App
import { SheetApiServiceBase } from "../../core/api/sheet-api-base.service";
import { BitdCharSheet } from "./sheet/sheet-model/bitd-char-sheet";
import { BitdCrewSheet } from "./sheet/sheet-model/bitd-crew-sheet";

@Injectable({ providedIn: 'root' })
export class BitdApiService extends SheetApiServiceBase<BitdCharSheet, BitdCrewSheet> {
  constructor(http: HttpClient) {
    super(http, 'api/bitd/sheets/char', 'api/bitd/sheets/crew');
  }
}
