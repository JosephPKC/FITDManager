import { Component, InputSignal, InputSignalWithTransform, OnChanges, OnInit, Signal, WritableSignal, computed, input, numberAttribute, signal } from "@angular/core";

@Component({
  selector: 'sheet-track',
  templateUrl: './sheet-track.component.html',
  styleUrl: './sheet-track.component.scss',
  standalone: true
})
export class SheetTrackComponent implements OnInit, OnChanges {
  // #region Inputs
  public nbrOfBoxes: InputSignalWithTransform<number, unknown> = input<number, unknown>(0, { transform: numberAttribute });
  public nbrOfMinMarks: InputSignalWithTransform<number, unknown> = input<number, unknown>(0, { transform: numberAttribute });
  // #endregion

  // #region Signals
  public marks: WritableSignal<number> = signal(0);
  public isComplete: Signal<boolean> = computed(() => this.nbrOfBoxes() === this.marks());
  // #endregion

  public boxes: boolean[] = [];

  constructor() { }

  public ngOnInit(): void {
    this.marks.set(this.nbrOfMinMarks());
    this.boxes = new Array<boolean>(this.nbrOfBoxes());
  }

  public ngOnChanges(): void {
    if (this.nbrOfBoxes() < 0) {
      throw 'nbrOfBoxes input is less than 0.';
    }

    if (this.nbrOfMinMarks() < 0 || this.nbrOfMinMarks() > this.nbrOfBoxes()) {
      throw 'nbrOfMinMarks input is less than 0 or more than nbrOfBoxes input.';
    }
  }

  // #region Marking/Unmarking
  public onBoxClick(index: number): void {
    if (index + 1 <= this.marks()) {
      // If clicked index <= current marks, unmark to that index
      this.unmark(index);
    }
    else if (index + 1 > this.marks()) {
      // If clicked index > current marks, mark up to that index
      this.mark(index + 1);
    }
  }

  public onInputChange(event: Event): void {
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const value: number = parseInt(element.value);
    this.changeMarks(value);
  }

  public changeMarks(marks: number): void {
    if (marks < this.marks()) {
      // If new value < current marks, unmark to that value.
      this.unmark(marks);
    }
    else if (marks > this.marks()) {
      // If new value > current marks, mark to that value.
      this.mark(marks);
    }
  }

  public unmark(marks: number): void {
    console.log(`UNMARKING: ${this.marks()}`);
    if (this.marks() <= this.nbrOfMinMarks()) {
      return;
    }

    const newValue: number = Math.max(this.nbrOfMinMarks(), marks);
    this.marks.set(newValue);
  }

  public mark(marks: number): void {
    console.log(`MARKING: ${this.marks()}`);
    if (this.marks() > this.nbrOfBoxes()) {
      return;
    }

    const newValue: number = Math.min(this.nbrOfBoxes(), marks);
    this.marks.set(newValue);
  }
  // #endregion

  // #region Track Box Helpers
  public isBoxMinMarked(index: number): boolean {
    // A box is min marked if its index is within the nbrOfMinMarks (it always goes from left to right or 0 to nbrOfBoxes).
    return index >= 0 && index < this.nbrOfMinMarks();
  }

  public isBoxMarked(index: number): boolean {
    // A box is marked if its index is within the marks (always goes from left to right or 0 to nbrOfBoxes).
    return index >= 0 && index < this.marks();
  }

  public getIdNameForBox(index: number): string {
    return `div-sheet-track-box-${index}`;
  }

  public getClassNameForBox(index: number): string {
    let className: string = 'div-sheet-track-box';

    if (this.isBoxMinMarked(index)) {
      className += ' div-sheet-track-box-min-marked';
    }
    else if (this.isBoxMarked(index)) {
      className += ' div-sheet-track-box-marked';
    }

    return className;
  }
  // #endregion
}
