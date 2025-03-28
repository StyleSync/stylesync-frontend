'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useQueryParams<T = {}>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries()) as Partial<T>;
  const urlSearchParams = new URLSearchParams(
    Array.from(searchParams.entries())
  );

  function setQueryParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value));
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  }

  function clearQueryParams(params: (keyof T)[]) {
    params.forEach((paramToRemove) => {
      if (typeof paramToRemove === 'string') {
        urlSearchParams.delete(paramToRemove);
      }
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  }

  function clearAllQueryParams() {
    clearQueryParams(Object.keys(queryParams) as (keyof T)[]);
  }

  return {
    queryParams,
    setQueryParams,
    clearQueryParams,
    clearAllQueryParams,
  };
}
