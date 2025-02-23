import {
  Component, InputSignalWithTransform, OnChanges, OutputEmitterRef, Signal, WritableSignal,
  computed, forwardRef, input, numberAttribute, output, signal
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { BaseInputDirective } from "@sheet/inputs";

@Component({
  selector: "track-input",
  templateUrl: "track-input.component.html",
  styleUrl: "track-input.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TrackInputComponent),
      multi: true
    }
  ],
  standalone: true
}) export class TrackInputComponent extends BaseInputDirective<number> implements ControlValueAccessor, OnChanges  {
  // #region Params
  public boxes: InputSignalWithTransform<number, unknown> = input.required<number, unknown>({ transform: numberAttribute });
  public minMarks: InputSignalWithTransform<number, unknown> = input<number, unknown>(0, { transform: numberAttribute });

  public onComplete: OutputEmitterRef<boolean> = output<boolean>();
  // #endregion

  // #region Internals
  protected marks: WritableSignal<number> = signal<number>(this.minMarks());

  protected isComplete: Signal<boolean> = computed<boolean>(() => {
    return this.boxes() === this.marks();
  });

  protected boxClasses: Signal<string[]> = computed(() => {
    // Prefill with the default class.
    const classList: string[] = new Array<string>(this.boxes()).fill("btn-track-box");

    for (let i: number = 0; i < classList.length; i++) {
      const mark: number = i + 1;
      if (mark <= this.minMarks()) {
        classList[i] += " track-box-min-marked";
      }

      if (mark <= this.marks()) {
        classList[i] += " track-box-marked";
      }
    }

    return classList;
  });

  protected containerClass: Signal<string> = computed<string>(() => {
    let className: string = "div-track";

    if (this.isDisabled()) {
      className += " div-disabled";
    }

    return className;
  });
  // #endregion

  // #region Lifecycle
  public ngOnChanges(): void {
    if (typeof this.boxes() !== "number") {
      throw "Input 'boxes' is not a number."
    }

    if (typeof this.minMarks() !== "number") {
      throw "Input 'minMarks' is not a number."
    }

    if (this.boxes() < 0) {
      throw "Input 'boxes' is less than 0.";
    }

    if (this.minMarks() < 0) {
      throw "Input 'minMarks' is less than 0.";
    }
  }
  // #endregion

  // #region Mark Controls
  protected onClickBox(index: number) {
    const nbrOfMarks: number = index + 1; // As index is 0-based
    if (nbrOfMarks <= this.marks()) {
      this.unmark(index); // Mark down (unmark) including this mark.
    }
    else if (nbrOfMarks > this.marks()) {
      this.mark(nbrOfMarks); // Mark up to nbrOfMarks
    }
  }

  /**
   * Mark (add) marks to boxes, starting at the beginning (or the min Mark index) all the way up to and including the index.
   * Cannot mark beyond the nbr of boxes.
   * @param index The index to mark to.
   */
  protected mark(index: number): void {
    if (this.marks() > this.boxes()) {
      return;
    }

    const newMarks: number = Math.min(this.boxes(), index);
    this.marks.set(newMarks);
  }

  /**
   * Unmark (remove) marks from boxes, starting at the end and going all the way down to and including the index.
   * Cannot unmark if the index is within the min marks range.
   * @param index The index to unmark to.
   */
  protected unmark(index: number): void {
    if (this.marks() <= this.minMarks()) {
      return;
    }

    const newMarks: number = Math.max(this.minMarks(), index);
    this.marks.set(newMarks);
  }
  // #endregion

  // #region Nbr Mark Controls
  protected onChangeMarks(event: Event) {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const marks: number = parseInt(element.value);

    if (marks < this.marks()) {
      this.unmark(marks);
    }
    else if (marks > this.marks()) {
      this.mark(marks);
    }
  }
  // #endregion

  // #region Helpers
  /**
   * Quietly sanitize the marks to be valid.
   * If it is less than min marks or 0, it gets set to min marks or 0.
   * If it is more than boxes, it gets set to boxes.
   * @param val
   */
  protected sanitizeMarks(val: number): number {
    if (val < this.minMarks()) {
      return this.minMarks();
    }

    if (val > this.boxes()) {
      return this.boxes();
    }

    return val;
  }
  // #endregion

  // #region ControlValueAccessor
  public registerOnChange(onChange: (value: number) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  public writeValue(val: number): void {
    this.marks.set(this.sanitizeMarks(val));
  }
  // #endregion
}
