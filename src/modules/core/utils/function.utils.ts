export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
) {
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, delay);
  };
}
