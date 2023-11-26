import type { Optional } from 'utility-types';

/**
 * Compares two items based on a specified comparison function.
 *
 * @template T - The type of the items being compared, must have an 'id' property.
 * @param {T} item1 - The first item to compare.
 * @param {Optional<T, 'id'>} item2 - The second item to compare, with an optional 'id' property.
 * @returns {boolean} - True if the items are considered equal, false otherwise.
 */
type CompareFunction<T extends { id: string }> = (
  item1: T,
  item2: Optional<T, 'id'>
) => boolean;

/**
 * Gets CRUD (Create, Read, Update, Delete) actions based on the comparison of two lists.
 *
 * @template T - The type of items in the lists, must have an 'id' property.
 * @param {T[]} base - The base list of items.
 * @param {Optional<T, 'id'>[]} next - The next list of items with optional 'id' property.
 * @param {CompareFunction<T>} compare - The comparison function to determine item equality.
 * @returns {{ create: Optional<T, 'id'>[], update: T[], remove: T[], skip: T[] }} - CRUD actions.
 */

export const getCrudActionsOfList = <T extends { id: string }>(
  base: T[],
  next: Optional<T, 'id'>[],
  compare: CompareFunction<T>
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
