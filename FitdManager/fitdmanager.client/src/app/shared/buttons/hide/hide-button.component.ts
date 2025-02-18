import {
  Component, InputSignal, OutputEmitterRef, WritableSignal,
  input, linkedSignal, output
} from "@angular/core";

import { BaseImgButtonDirective } from "@shared/buttons";

@Component({
  selector: "hide-button",
  templateUrl: "hide-button.component.html",
  styleUrl: "hide-button.component.scss",
  standalone: true
})
export class HideButtonComponent extends BaseImgButtonDirective {
  // #region Params
  public hidden: InputSignal<boolean> = input<boolean>(false);

  public onHiddenChange: OutputEmitterRef<boolean> = output<boolean>();
  // #endregion

  // #region Internals
  protected showVisibility: WritableSignal<boolean> = linkedSignal<boolean>(() => {
    return !this.hidden();
  });
  // #endregion

  // #region Hide Controls
  protected onClickHide(): void {
    this.showVisibility.update(val => !val);
    this.onHiddenChange.emit(!this.showVisibility());
  }
  // #endregion

  // #region Helpers
  protected override getImgSrc(): string {
    if (this.showVisibility()) {
      return "/icons/MaterialIcons/visibility.svg";
    }

    return "/icons/MaterialIcons/visibility_off.svg";
  }
  // #endregion
}
