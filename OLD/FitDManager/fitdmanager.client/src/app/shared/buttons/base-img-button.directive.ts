import { Directive, InputSignal, input } from "@angular/core";

@Directive({
  selector: 'base-img-button'})
export abstract class BaseImgButtonDirective {
  // #region Params
  public height: InputSignal<string> = input<string>("15");
  public width: InputSignal<string> = input<string>("15");
  // #endregion
}
