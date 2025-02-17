export function getIndexByValue<T>(list: T[], value: T): number | null {
  let index: number = list.indexOf(value);
  return index >= 0 ? index : null;
}

export function getListItem(list: string[], index: number | null): string;
export function getListItem<T>(list: T[], index: number | null): T | null {
  if (index === null) {
    return null;
  }

  if (!isIndexValid(list, index)) {
    return null;
  }

  return list[index];
}

export function isIndexValid<T>(list: T[], index: number): boolean {
  if (index < 0 || index >= list.length) {
    return false;
  }

  return true;
}

