'use client';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
// utils
import { trpc } from '@/utils/trpc';

export default function Home() {
  const { data } = trpc.hello.useQuery({ text: 'world' });
  const { data: users } = trpc.userList.useQuery();

  return (
    <main>
      <Typography variant='body1'>{data?.greeting}</Typography>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}
