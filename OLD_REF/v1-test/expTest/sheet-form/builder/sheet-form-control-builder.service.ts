import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SheetFormElementBase } from '../elements/sheet-form-element-base';

@Injectable({ providedIn: 'root' })
export class SheetFormControlBuilderService {
  public createFormGroup(elements: SheetFormElementBase<string>[]): FormGroup {
    const group: any = {}

    elements.forEach((element) => {
      group[element.name] = new FormControl(element.initValue);
    });

    return new FormGroup(group);
  }
}
