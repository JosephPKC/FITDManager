import { SimpleChange } from "@angular/core";

  export function callIfChanged<T>(propName: string, prop: SimpleChange, callback: (val: T) => void) {
  console.log(`Checking if there is a change for ${propName}`);
  if (prop !== undefined && prop.currentValue !== undefined) {
    console.log(`There is a change Current: ${prop.currentValue}. Previous: ${prop.previousValue}.`);
  }
}
