import { Directive } from "@angular/core";

import { BaseInputDirective } from "@sheet/inputs";

/**
 * Base table input
 */
@Directive({
  selector: "base-table-input",
  standalone: true
})
export class BaseTableInputDirective<TValue> extends BaseInputDirective<TValue> {

}
