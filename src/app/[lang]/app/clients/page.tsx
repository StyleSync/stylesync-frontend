import { ClientsListContainer } from '@/modules/client/containers/clients-list-container';
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
      <ClientsListContainer />
    </div>
  );
}
