import { type FC, useCallback, useRef } from 'react';
import { useIntl } from 'react-intl';

// containers
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { onQueryRetry } from '@/modules/core/utils/query-retry.utils';

// types
import type { Address } from '@/modules/location/types/address.types';
import { showToast } from '@/modules/core/providers/toast-provider';

export const ProfessionalSettingsLocation: FC = () => {
  const intl = useIntl();
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
      locationCreate.mutate(
        {
          name: newLocation.name,
          latitude: newLocation.lat,
          longitude: newLocation.lng,
        },
        {
          onError: () => {
            showToast({
              variant: 'error',
              title: intl.formatMessage({
                id: 'professional.settings.location.toast.error.title.add',
              }),
              description: intl.formatMessage({
                id: 'professional.settings.location.toast.error.description.add',
              }),
            });
          },

          onSuccess: () => {
            showToast({
              variant: 'success',
              title: intl.formatMessage({
                id: 'professional.settings.location.toast.success.title.add',
              }),
              description: intl.formatMessage({
                id: 'professional.settings.location.toast.success.description.add',
              }),
            });
          },
        }
      );

      return;
    }

    // If there is an existing location and there is an newLocation , update the existing location
    if (location && newLocation) {
      locationUpdate.mutate(
        {
          id: location.id,
          name: newLocation.name,
          latitude: newLocation.lat,
          longitude: newLocation.lng,
        },
        {
          onError: () => {
            showToast({
              variant: 'error',
              title: intl.formatMessage({
                id: 'professional.settings.location.toast.error.title.change',
              }),
              description: intl.formatMessage({
                id: 'professional.settings.location.toast.error.description.change',
              }),
            });
          },

          onSuccess: () => {
            showToast({
              variant: 'success',
              title: intl.formatMessage({
                id: 'professional.settings.location.toast.success.title.change',
              }),
              description: intl.formatMessage({
                id: 'professional.settings.location.toast.success.description.change',
              }),
            });
          },
        }
      );

      return;
    }

    // If there is an existing location but no address, delete the existing location
    if (location && !newLocation) {
      locationDelete.mutate(
        {
          id: location.id,
        },
        {
          onError: () => {
            showToast({
              variant: 'error',
              title: intl.formatMessage({
                id: 'professional.settings.location.toast.error.title.delete',
              }),
              description: intl.formatMessage({
                id: 'professional.settings.location.toast.error.description.delete',
              }),
            });
          },

          onSuccess: () => {
            showToast({
              variant: 'success',
              title: intl.formatMessage({
                id: 'professional.settings.location.toast.error.title.delete',
              }),
              description: intl.formatMessage({
                id: 'professional.settings.location.toast.error.description.delete',
              }),
            });
          },
        }
      );

      return;
    }
  }, [location, locationCreate, locationDelete, locationUpdate]);

  return (
    <ProfileSettingsTabContentLayout
      title={intl.formatMessage({
        id: 'professional.settings.location.title',
      })}
      icon='location'
      isLoading={locationQuery.isLoading}
      actions={[
        {
          text: intl.formatMessage({ id: 'button.save' }),
          isLoading: isSaveLoading,
          onClick: handleSave,
        },
      ]}
      hideActions={locationQuery.isLoading}
    >
      <UserLocationSelectForm location={location} ref={locationSelectFormRef} />
    </ProfileSettingsTabContentLayout>
  );
};
