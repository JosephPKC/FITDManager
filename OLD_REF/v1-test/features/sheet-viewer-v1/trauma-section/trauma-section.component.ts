import { Component, InputSignal, InputSignalWithTransform, OnInit, OutputEmitterRef, WritableSignal, input, numberAttribute, output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'trauma-section',
  templateUrl: './trauma-section.component.html',
  styleUrl: './trauma-section.component.scss',
  imports: [FormsModule],
  standalone: true
})
export class TraumaSectionComponent implements OnInit {
  // The operation is as follows:
  // - There is a default list.
  //  - User can click on an item in the default list to add it to trauma table.
  //  - User can click on an already added item in the default list to remove it from the trauma table. It will be circled.
  // - Trauma has a max of 4 slots. Each item is a string
  //  - There is a text field and button to add a custom trauma.
  //  - User can click on the add custom button to add whatever is in the text field to the trauma table.
  //  - Trauma is added to the bottom of the table, shifting upwards.
  // - If there is already 4 trauma at the table, the add custom button is disabled, and click on an uncircled default trauma does nothing.
  //  - At each table item, there is a remove button that lets you remove the trauma.
  //  - If the trauma is a default item, then it is uncircled as well.
  // - There can optionally be a toggle edit button that enables the custom adding button, deletion, etc.


  // #region Inputs
  public traumaDefaults: InputSignal<string[]> = input<string[]>([]);
  public labelText: InputSignal<string> = input<string>('');
  public maxTrauma: InputSignalWithTransform<number, unknown> = input<number, unknown>(0, { transform: numberAttribute });
  // #endregion

  // #region Outputs
  public onChangeTrauma: OutputEmitterRef<string[]> = output<string[]>();
  // #endregion

  // #region States
  public traumaList: WritableSignal<string[]> = signal<string[]>([]);
  public traumaDefaultHighlights: WritableSignal<boolean[]> = signal<boolean[]>([]);
  public customTraumaInput: string = '';

  public isEditable: WritableSignal<boolean> = signal<boolean>(false);
  // #endregion

  public ngOnInit(): void {
    let highlights: boolean[] = [];
    for (let trauma in this.traumaDefaults()) {
      highlights.push(false);
    }
    this.traumaDefaultHighlights.set(highlights);
  }

  public getDefaultTraumaItemClass(index: number): string {
    let className: string = 'div-trauma-default-list-item';

    if (this.isDefaultTraumaSelected(index)) {
      className += ' trauma-default-selected';
    }

    return className;
  }

  // #region Clicking Default Trauma
  public onDefaultTraumaClick(index: number): void {
    // If user clicks on a trauma, highlight or dehighlight the circle, and add it to the trauma list

    /* Get the trauma string. Search trauma list for the string.
     * If it exists, then the trauma is already added. Remove the string from the list, and mark the default trauma as unselected.
     * If it does not exist, then the trauma is not added.
     * Check if trauma list is maxed out or not.
     * If it is, then do nothing else.
     * If it is not, then add the trauma string to the end of the list, and mark the default trauma as selected.
     *
     * Later on, we can use whether it is circled or not to determine if we need to add it or remove it.
     * Circling is a result of adding a class to the element. Can we programmatically read the element? This might just be putting the cart before the horse.
     */
    console.log(`Clicked ${index}`);
    if (index < 0 || index >= this.traumaDefaults().length) {
      throw `Index ${index} is out of range for default trauma.`;
    }

    if (!this.isEditable()) {
      return;
    }

    const defTrauma: string = this.traumaDefaults()[index];

    if (this.traumaDefaultHighlights()[index]) {
      this.removeDefaultTrauma(defTrauma, index);
    }
    else  {
      this.addDefaultTrauma(defTrauma, index);
    }

    console.log(`Trauma list: ${this.traumaList()}`)
  }

  private removeDefaultTrauma(defTrauma: string, index: number): void {
    console.log(`Removing default trauma: ${defTrauma}, ${index}`);
    const traumaIndex: number = this.getTraumaListIndex(defTrauma);
    this.removeTrauma(traumaIndex);
    this.updateDefaultTraumaHighlight(index, false);

  }

  private addDefaultTrauma(defTrauma: string, index: number): void  {
    console.log(`Adding default trauma: ${defTrauma}, ${index}`);
    const result: boolean = this.addTrauma(defTrauma);
    if (result) {
      this.updateDefaultTraumaHighlight(index, true);
    }
  }

  private updateDefaultTraumaHighlight(index: number, result: boolean): void {
    console.log(`Updating highlight for ${index}, ${result}`);
    let newHighlights: boolean[] = Object.assign([], this.traumaDefaultHighlights());
    newHighlights[index] = result;

    this.traumaDefaultHighlights.set(newHighlights);
  }
  // #endregion

  // #region Add Custom Trauma
  public onClickAddCustomTrauma(customTrauma: string) {
    console.log(`Adding custom trauma: ${customTrauma}`);

    this.addTrauma(customTrauma);
    this.customTraumaInput = '';
  }
  // #endregion

  // #region Toggle Edit
  public onClickEdit(): void {
    console.log(`Toggle edit`)
    this.isEditable.set(!this.isEditable());
  }
  // #endregion

  // #region Update Trauma
  public onClickUpdateTrauma(newTrauma: string, index: number): void {
    if (index < 0 || index >= this.maxTrauma()) {
      throw `Index ${index} is out of range for trauma.`;
    }

    if (newTrauma == '') {
      this.removeTrauma(index);

      if (this.isDefaultTrauma(newTrauma)) {
        //this.removeDefaultTrauma(this.)
      }
    }
    else {
      this.updateTrauma(newTrauma, index);
    }
  }
  // #endregion

  private removeTrauma(index: number): void {
    console.log(`Removing trauma: ${index}`);
    let newTraumaList: string[] = [];
    for (let i: number = 0; i < this.traumaList().length; i++) {
      if (i == index) {
        continue;
      }
      newTraumaList.push(this.traumaList()[i]);
    }

    this.traumaList.set(newTraumaList);
  }

  private addTrauma(newTrauma: string): boolean {
    console.log(`Adding trauma: ${newTrauma}`);
    if (this.traumaList().length >= this.maxTrauma()) {
      return false;
    }

    let newTraumaList: string[] = Object.assign([], this.traumaList());
    newTraumaList.push(newTrauma);

    this.traumaList.set(newTraumaList);

    return true;
  }

  private updateTrauma(newTrauma: string, index: number): void {
    let newTraumaList: string[] = Object.assign([], this.traumaList());
    newTraumaList[index] = newTrauma;

    this.traumaList.set(newTraumaList);
  }

  private hasTrauma(trauma: string): boolean {
    return this.traumaList().includes(trauma);
  }

  private isDefaultTrauma(trauma: string): boolean {
    return this.traumaDefaults().includes(trauma);
  }

  private getTraumaListIndex(trauma: string): number {
    return this.traumaList().indexOf(trauma);
  }

  private isDefaultTraumaSelected(defTraumaIndex: number): boolean {
    return this.traumaDefaultHighlights()[defTraumaIndex];
  }
}
