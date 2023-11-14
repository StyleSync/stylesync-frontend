import type { Optional } from 'utility-types';

export const getCrudActionsOfList = <T extends { id: string }>(
  base: T[],
  next: Optional<T, 'id'>[],
  compare: (item1: T, item2: Optional<T, 'id'>) => boolean
) => {
  const create: Optional<T, 'id'>[] = [];
  const update: T[] = [];
  const remove: T[] = [];
  const skip: T[] = [];

  // find skip, create, update
  for (const nextItem of next) {
    const baseEquivalent = base.find((item) => item.id === nextItem.id);

    if (!baseEquivalent) {
      create.push(nextItem);
      continue;
    }

    const isEqual = compare(baseEquivalent, nextItem);

    isEqual ? skip.push(nextItem as T) : update.push(nextItem as T);
  }

  // find remove
  for (const baseItem of base) {
    const nextEquivalent = next.find((item) => item.id === baseItem.id);

    if (!nextEquivalent) {
      remove.push(baseItem);
    }
  }

  return { create, update, remove, skip };
};
