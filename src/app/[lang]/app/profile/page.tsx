import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ProfileRedirect() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(`/app/profile/${session.user.id}`);
  }
}
