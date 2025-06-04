import { useBoolean } from 'usehooks-ts';
import { TRPCClientError } from '@trpc/client';
import { useRef, useCallback } from 'react';
import { ProLocation } from '@/modules/user/components/pro-location';
import { ProfileSectionLayout } from '@/modules/user/components/profile-section-layout';
import { trpc } from '@/modules/core/utils/trpc.utils';
import type { AppRouter } from '@/server/routers/_app';

import { ProfileSectionLayoutLocationProps } from './profile-section-layout-location.interface';
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';
import { onQueryRetry } from '@/modules/core/utils/query-retry.utils';
import type { Address } from '@/modules/location/types/address.types';
import { Button } from '@/modules/core/components/button';
import { useIntl } from 'react-intl';
import { showToast } from '@/modules/core/providers/toast-provider';

export const ProfileSectionLayoutLocation = ({
  userId,
}: ProfileSectionLayoutLocationProps) => {
  const isEdit = useBoolean();
  const intl = useIntl();

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
            showToast({
              variant: 'success',
              title: intl.formatMessage({
                id: 'professional.settings.location.toast.success.title.add',
              }),
              description: intl.formatMessage({
                id: 'professional.settings.location.toast.success.description.add',
              }),
            });
            isEdit.setFalse();
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
            isEdit.setFalse();
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
            showToast({
              variant: 'success',
              title: intl.formatMessage({
                id: 'professional.settings.location.toast.success.title.delete',
              }),
              description: intl.formatMessage({
                id: 'professional.settings.location.toast.success.description.delete',
              }),
            });
            isEdit.setFalse();
          },
        }
      );

      return;
    }
  }, [location, locationCreate, locationDelete, locationUpdate]);

  return (
    <ProfileSectionLayout
      title='pro.layout.title.location'
      id='profile-location'
      edit={isEdit.value}
      onEdit={isEdit.toggle}
      onCancel={isEdit.setFalse}
    >
      {isEdit.value ? (
        <div className='flex flex-col gap-y-6'>
          <UserLocationSelectForm
            location={location}
            ref={locationSelectFormRef}
          />

          <Button
            isLoading={isSaveLoading}
            onClick={handleSave}
            className='ml-auto'
            text={intl.formatMessage({ id: 'button.save' })}
          />
        </div>
      ) : (
        <ProLocation userId={userId} />
      )}
    </ProfileSectionLayout>
  );
};
