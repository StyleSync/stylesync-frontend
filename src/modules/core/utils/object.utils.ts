export const isObjEqualDeep = <T extends object>(
  o1: T,
  o2: T,
  keys?: (keyof T)[]
): boolean => {
  const keysToCompare = keys || (Object.keys(o1) as (keyof T)[]);

  for (const key of keysToCompare) {
    if (o1[key] !== o2[key]) {
      return false;
    }
  }

  return true;
};
