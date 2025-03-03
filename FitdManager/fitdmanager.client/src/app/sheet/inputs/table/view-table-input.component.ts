import {
  Component, InputSignal, InputSignalWithTransform, OnChanges, OnInit, Signal, WritableSignal,
  booleanAttribute,
  computed, forwardRef, input, numberAttribute, signal
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { BaseTableInputDirective } from "./base-table-input.directive";
import { BaseInputDirective } from "../base-input.directive";

/**
 * Table input that only displays its contents.
 * The user has no direct ability to change the contents within this input.
 */
//@Component({
//  selector: "view-table-input",
//  templateUrl: "view-table-input.component.html",
//  styleUrl: "view-table-input.component.scss",
//  providers: [
//    {
//      provide: NG_VALUE_ACCESSOR,
//      useExisting: forwardRef(() => ViewTableInputComponent),
//      multi: true
//    }
//  ],
//  standalone: true
//})
//export class ViewTableInputComponent extends BaseInputDirective<string[]> {
//  // #region Inputs

//  // #endregion

//  // #region State

//  // #endregion

//  // #region Computes
//  // #endregion

//}
