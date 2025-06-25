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
    <div className='px-4 py-20'>
      <ClientsList />
    </div>
  );
}
