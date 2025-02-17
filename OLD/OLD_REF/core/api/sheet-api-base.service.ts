// Core
import { HttpClient } from "@angular/common/http";

// Third Party
import { Observable } from "rxjs";

// App
import { ApiServiceBase } from "./api-base.service";

export abstract class SheetApiServiceBase<TChar, TCrew> extends ApiServiceBase {
  protected readonly charSheetEndpoint;
  protected readonly crewSheetEndpoint;

  constructor(http: HttpClient, charEndpoint: string, crewEndpoint: string) {
    super(http);

    this.charSheetEndpoint = charEndpoint;
    this.crewSheetEndpoint = crewEndpoint;
  }

  public getCharSheet(id: string): Observable<TChar> {
    return super.getItemFromApi<TChar>(id, this.charSheetEndpoint);
  }

  public getCrewSheet(id: string): Observable<TCrew> {
    return super.getItemFromApi<TCrew>(id, this.crewSheetEndpoint);
  }

  public putCharSheet(id: string, data: TChar): Observable<TChar> {
    return super.putItemToApi<TChar>(id, this.charSheetEndpoint, data);
  }

  public putCrewSheet(id: string, data: TCrew): Observable<TCrew> {
    return super.putItemToApi<TCrew>(id, this.crewSheetEndpoint, data);
  }
}
