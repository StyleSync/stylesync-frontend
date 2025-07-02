import { ClientsList } from '@/modules/client/containers/clients-list';
import { pageGuard } from '@/modules/core/utils/route.utils';

export default async function Clients() {
  const session = await pageGuard({
    require: {
      onboarding: true,
      userType: true,
    },
  });

  if (!session) {
    return null;
  }

  return (
    <div className='relative z-10 h-screen py-20'>
      <ClientsList />
    </div>
  );
}
