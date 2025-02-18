import {
  Directive, InputSignal, Signal,
  computed, input
} from "@angular/core";

@Directive({
  selector: "base-img-button"})
export abstract class BaseImgButtonDirective {
  // #region Params
  public height: InputSignal<string> = input<string>("15");
  public width: InputSignal<string> = input<string>("15");
  // #endregion

  // #region Internals
  protected imgSrc: Signal<string> = computed<string>(() => {
    return this.getImgSrc();
  });
  // #endregion

  // #region Helpers
  protected getImgSrc(): string {
    return "";
  }
  // #endregion
}
