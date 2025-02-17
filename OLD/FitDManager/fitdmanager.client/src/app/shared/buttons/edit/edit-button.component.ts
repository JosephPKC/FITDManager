import {
  Component, ModelSignal, OutputEmitterRef,
  model, output
} from "@angular/core";

import { BaseImgButtonDirective } from "@app/shared/buttons";

@Component({
  selector: 'edit-button',
  templateUrl: './edit-button.component.html',
  styleUrl: './edit-button.component.scss',
  standalone: true
})
export class EditButtonComponent extends BaseImgButtonDirective {
  // #region Params
  public isEditable: ModelSignal<boolean> = model<boolean>(false);

  public onIsEditableChange: OutputEmitterRef<boolean> = output<boolean>();
  // #endregion

  // #region Toggle Edit Controls
  protected onClickToggleEdit(): void {
    console.log(`On click in button`);
    this.isEditable.update(val => !val);

    this.onIsEditableChange.emit(this.isEditable());
  }
  // #endregion
}
