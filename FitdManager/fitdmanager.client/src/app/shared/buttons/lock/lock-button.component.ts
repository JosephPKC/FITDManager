import {
  Component, InputSignal, OutputEmitterRef, Signal, WritableSignal,
  computed, input, linkedSignal, output
} from "@angular/core";

import { BaseImgButtonDirective } from "@shared/buttons";

@Component({
  selector: "lock-button",
  templateUrl: "lock-button.component.html",
  styleUrl: "lock-button.component.scss",
  standalone: true
})
export class LockButtonComponent extends BaseImgButtonDirective {
  // #region Params
  public locked: InputSignal<boolean> = input<boolean>(false);

  public onLockedChange: OutputEmitterRef<boolean> = output<boolean>();
  // #endregion

  // #region Internals
  protected showLock: WritableSignal<boolean> = linkedSignal<boolean>(() => {
    return this.locked();
  });

  protected imgSrc: Signal<string> = computed<string>(() => {
    if (this.showLock()) {
      return "/icons/MaterialUI/lock.svg";
    }

    return "/icons/MaterialUI/lock_open.svg";
  });
  // #endregion

  // #region Lock Controls
  protected onClickLock(): void {
    this.showLock.update(val => !val);
    this.onLockedChange.emit(this.showLock());
  }
  // #endregion
}
