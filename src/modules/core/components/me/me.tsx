'use client';
import { trpc } from '@/modules/core/utils/trpc.utils';

export const Me = () => {
  const { data } = trpc.user.me.useQuery();

  return <div>{JSON.stringify(data)}</div>;
};
