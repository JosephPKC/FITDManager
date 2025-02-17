import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { SheetFormElementBase } from '../elements/sheet-form-element-base';
import { SheetFormTextField } from '../elements/sheet-form-text-field';

@Injectable({ providedIn: 'root' })
export class SheetFormTemplateSourceService {
  public getSheetFormElements(): Observable<SheetFormElementBase<string>[]> {
    const elements: SheetFormElementBase<string>[] = this.getSheetFormElementsFromApi();

    return of(elements.sort((a, b) => a.order - b.order));
  }

  private getSheetFormElementsFromApi(): SheetFormElementBase<string>[] {
    return [
      new SheetFormTextField({
        name: 'crewName',
        label: 'Crew Name: ',
        elementId: 'sfe-crew-name',
        order: 1
      }),
      new SheetFormTextField({
        name: 'name',
        label: 'Name: ',
        elementId: 'sfe-name',
        order: 2
      }),
      new SheetFormTextField({
        name: 'alias',
        label: 'Alias: ',
        elementId: 'sfe-alias',
        order: 3
      }),
      new SheetFormTextField({
        name: 'look',
        label: 'Look: ',
        elementId: 'sfe-look',
        order: 4
      })
    ];
  }
}
