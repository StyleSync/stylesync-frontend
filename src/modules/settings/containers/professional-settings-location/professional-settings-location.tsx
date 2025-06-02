import { type FC, useCallback, useRef } from 'react';

import { sendGTMEvent } from '@next/third-parties/google';
import { TRPCClientError } from '@trpc/client';
import { useIntl } from 'react-intl';

import { showToast } from '@/modules/core/providers/toast-provider';
import { onQueryRetry } from '@/modules/core/utils/query-retry.utils';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';
import type { Address } from '@/modules/location/types/address.types';
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import type { AppRouter } from '@/server/routers/_app';

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
        retry: (retryCount, error) =>
          onQueryRetry(retryCount, error as TRPCClientError<AppRouter>),
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
    locationCreate.isPending ||
    locationUpdate.isPending ||
    locationDelete.isPending;

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
            if (me?.userType === 'PROFESSIONAL') {
              sendGTMEvent({
                event: 'data_submit',
                user_id: me?.id,
                user_email: me?.email,
                data: {
                  type: 'location',
                  name: Boolean(newLocation.name),
                  latitude: Boolean(newLocation.lat),
                  longitude: Boolean(newLocation.lng),
                },
              });
            }

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
            if (me?.userType === 'PROFESSIONAL') {
              sendGTMEvent({
                event: 'data_submit',
                user_id: me?.id,
                user_email: me?.email,
                data: {
                  type: 'location',
                  name: Boolean(newLocation.name),
                  latitude: Boolean(newLocation.lat),
                  longitude: Boolean(newLocation.lng),
                },
              });
            }

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
                id: 'professional.settings.location.toast.success.title.delete',
              }),
              description: intl.formatMessage({
                id: 'professional.settings.location.toast.success.description.delete',
              }),
            });
          },

          onSuccess: () => {
            if (me?.userType === 'PROFESSIONAL') {
              sendGTMEvent({
                event: 'data_submit',
                user_id: me?.id,
                user_email: me?.email,
                data: {
                  type: 'location',
                  deleted: true,
                },
              });
            }

            showToast({
              variant: 'success',
              title: intl.formatMessage({
                id: 'professional.settings.location.toast.success.title.delete',
              }),
              description: intl.formatMessage({
                id: 'professional.settings.location.toast.success.description.delete',
              }),
            });
          },
        }
      );

      return;
    }
  }, [
    location,
    locationCreate,
    locationDelete,
    locationUpdate,
    me?.userType,
    me?.id,
    me?.email,
    intl,
  ]);

  return (
    <ProfileSettingsTabContentLayout
      title={'professional.settings.location.title'}
      icon='location'
      isLoading={locationQuery.isPending}
      actions={[
        {
          text: intl.formatMessage({ id: 'button.save' }),
          isLoading: isSaveLoading,
          onClick: handleSave,
        },
      ]}
      hideActions={locationQuery.isPending}
    >
      <UserLocationSelectForm location={location} ref={locationSelectFormRef} />
    </ProfileSettingsTabContentLayout>
  );
};
