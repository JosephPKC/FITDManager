import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SheetFormControlBuilderService } from './builder/sheet-form-control-builder.service';
import { SheetFormElementBase } from './elements/sheet-form-element-base';

@Component({
  selector: 'sheet-form',
  templateUrl: './sheet-form.component.html'
})
export class SheetFormComponent implements OnInit {
  // #region Dependencies
  private sfeBuilder: SheetFormControlBuilderService = inject(SheetFormControlBuilderService);
  // #endregion

  @Input() public elements?: SheetFormElementBase<string>[] = [];
  public form!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = this.sfeBuilder.createFormGroup(this.elements as SheetFormElementBase<string>[]);
  }

  public onSubmit() {

  }
}
