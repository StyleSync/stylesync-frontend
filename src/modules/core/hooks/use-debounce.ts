import { useEffect, useState } from 'react';

export const UseDebounce = <T>(value: T, deley = 400) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value);
    }, deley);

    return () => clearTimeout(timeOut);
  }, [deley, value]);

  return debouncedValue;
};
