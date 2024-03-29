import { type FC, useCallback, useRef } from 'react';
// containers
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { onQueryRetry } from '@/modules/core/utils/query-retry.utils';

// types
import type { Address } from '@/modules/location/types/address.types';

export const ProfessionalSettingsLocation: FC = () => {
  // queries
  const { data: me } = trpc.user.me.useQuery({ expand: ['professional'] });
  const { data: location, ...locationQuery } =
    trpc.location.getByProfessionalId.useQuery(
      {
        id: me?.professional?.id ?? '',
      },
      {
        enabled: Boolean(me?.professional?.id),
        retry: (retryCount, error) => onQueryRetry(retryCount, error),
      }
    );
  // mutations
  const locationCreate = trpc.location.create.useMutation();
  const locationUpdate = trpc.location.update.useMutation();
  const locationDelete = trpc.location.delete.useMutation();

  // refs
  const locationSelectFormRef = useRef<null | {
    getAddress: () => Address | null;
  }>(null);
  const isSaveLoading =
    locationCreate.isLoading ||
    locationUpdate.isLoading ||
    locationDelete.isLoading;

  const handleSave = useCallback(async () => {
    if (!locationSelectFormRef.current) return;

    const newLocation = locationSelectFormRef.current.getAddress();

    // If there is no existing location and there is an newLocation , create a new location
    if (!location && newLocation) {
      locationCreate.mutate({
        name: newLocation.name,
        latitude: newLocation.lat,
        longitude: newLocation.lng,
      });

      return;
    }

    // If there is an existing location and there is an newLocation , update the existing location
    if (location && newLocation) {
      locationUpdate.mutate({
        id: location.id,
        name: newLocation.name,
        latitude: newLocation.lat,
        longitude: newLocation.lng,
      });

      return;
    }

    // If there is an existing location but no address, delete the existing location
    if (location && !newLocation) {
      locationDelete.mutate({
        id: location.id,
      });

      return;
    }
  }, [location, locationCreate, locationDelete, locationUpdate]);

  return (
    <ProfileSettingsTabContentLayout
      title='Location settings'
      icon='location'
      isLoading={locationQuery.isLoading}
      actions={[
        { text: 'Save', isLoading: isSaveLoading, onClick: handleSave },
      ]}
      hideActions={locationQuery.isLoading}
    >
      <UserLocationSelectForm location={location} ref={locationSelectFormRef} />
    </ProfileSettingsTabContentLayout>
  );
};
