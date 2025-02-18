import {
  Component, OutputEmitterRef,
  output
} from "@angular/core";

import { BaseImgButtonDirective } from "@shared/buttons";

@Component({
  selector: "reset-button",
  templateUrl: "reset-button.component.html",
  styleUrl: "reset-button.component.scss",
  standalone: true
})
export class ResetButtonComponent extends BaseImgButtonDirective {
  // #region Params
  public onReset: OutputEmitterRef<void> = output<void>();
  // #endregion

  // #region Reset Controls
  protected onClickReset(): void {
    this.onReset.emit();
  }
  // #endregion

  // #region Helpers
  protected override getImgSrc(): string {
    return "/icons/MaterialIcons/refresh.svg";
  }
  // #endregion
}
