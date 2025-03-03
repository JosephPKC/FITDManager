import {
  Directive, InputSignal,
  input
} from "@angular/core";

import { BaseInputDirective } from "@sheet/inputs";

/**
 * Base table input
 */
@Directive({
  selector: "base-table-input",
  standalone: true
})
export abstract class BaseTableInputDirective<TValue> extends BaseInputDirective<TValue> {

}
