// Core
import { HttpClient } from "@angular/common/http";

// Third Party
import { Observable } from "rxjs";

// App
import { UrlBuilder } from "../../utils/url-builder";

export abstract class ApiServiceBase {
  constructor(protected http: HttpClient) { }

  protected getItemFromApi<TItem>(id: string, endpoint: string): Observable<TItem> {
    const url: string = this.getFullUrl(endpoint, id);
    console.log("GET " + url);
    return this.http.get<TItem>(url);
  }

  protected putItemToApi<TItem>(id: string, endpoint: string, data: TItem): Observable<TItem> {
    const url: string = this.getFullUrl(endpoint, id);
    console.log("PUT " + url);
    return this.http.put<TItem>(url, data);
  }

  protected getFullUrl(baseUrl: string, resource: string): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(baseUrl);
    urlBuilder.AddSubPath(resource);

    return urlBuilder.toString();
  }
}
