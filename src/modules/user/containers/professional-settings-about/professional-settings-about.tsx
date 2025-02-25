'use client';
import { type FC, useCallback, useId, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { useIntl } from 'react-intl';

import { ERROR_MESSAGE } from '@/modules/core/constants/error-messages.constants';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { AboutProfessionalForm } from '@/modules/user/components/about-professional-form';
import type { AboutProfessionalFormValues } from '@/modules/user/components/about-professional-form/about-professional-form.interface';
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { useAvatarUploadMutation } from '@/modules/user/hooks/use-avatar-upload-mutation';

export const ProfessionalSettingsAbout: FC = () => {
  const intl = useIntl();
  const formId = useId();
  const queryClient = useQueryClient();

  // queries
  const { data: me, ...meQuery } = trpc.user.me.useQuery({
    expand: ['professional'],
  });

  // mutations
  const userUpdate = trpc.user.update.useMutation({ useErrorBoundary: false });
  const proUpdate = trpc.professional.update.useMutation({
    useErrorBoundary: false,
  });
  const avatarUpload = useAvatarUploadMutation();
  // memo
  const initialValues = useMemo<
    Partial<AboutProfessionalFormValues & { avatar: string }>
  >(
    () => ({
      avatar: me?.avatar ?? undefined,
      firstName: me?.firstName ?? undefined,
      lastName: me?.lastName ?? undefined,
      phone: me?.phone ?? undefined,
      email: me?.email ?? undefined,
      about: me?.professional?.about ?? '',
      instagram: me?.professional?.instagram ?? '',
      facebook: me?.professional?.facebook ?? '',
      nickname: me?.nickname ?? '',
      tiktok: me?.professional?.tiktok ?? '',
    }),
    [me]
  );
  const isSaveLoading =
    userUpdate.isLoading || proUpdate.isLoading || avatarUpload.isLoading;

  const handleSubmit = useCallback(
    async (
      values: AboutProfessionalFormValues & { avatar?: File | string | null },
      onError: (error: any) => void
    ) => {
      let avatarUrl: string | null = null;

      if (values.avatar) {
        if (typeof values.avatar === 'object') {
          const uploadedAvatar = await avatarUpload.mutateAsync(values.avatar);

          avatarUrl = uploadedAvatar.url;
        } else {
          avatarUrl = values.avatar as string;
        }
      }

      Promise.all([
        userUpdate.mutateAsync({
          avatar: avatarUrl,
          firstName: values.firstName || undefined,
          lastName: values.lastName || undefined,
          phone: values.phone || undefined,
          nickname: values.nickname || undefined,
        }),
        me?.userType !== 'CUSTOMER' &&
          proUpdate.mutateAsync({
            about: values.about || '',
            instagram: values.instagram || '',
            facebook: values.facebook || '',
            tiktok: values.tiktok || '',
          }),
      ])
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: getQueryKey(trpc.professional.getProfileCompletionStatus),
          });

          showToast({
            variant: 'success',
            title: intl.formatMessage({
              id: 'professional.settings.about.toast.success.title',
            }),
            description: intl.formatMessage({
              id: 'professional.settings.about.toast.success.description',
            }),
          });
        })
        .catch((error) => {
          showToast({
            variant: 'error',
            title: ERROR_MESSAGE.SOMETHING_WENT_WRONG,
            description: intl.formatMessage({
              id: 'professional.settings.about.toast.error.description',
            }),
          });

          if (error) {
            onError(error);
          }
        });
    },
    [userUpdate, proUpdate, avatarUpload, intl, me?.userType, queryClient]
  );

  return (
    <ProfileSettingsTabContentLayout
      title={'professional.settings.about.title'}
      icon='info'
      isLoading={meQuery.isLoading}
      actions={[
        {
          text: intl.formatMessage({ id: 'button.save' }),
          form: formId,
          isLoading: isSaveLoading,
          disabled: !me,
          type: 'submit',
        },
      ]}
    >
      <AboutProfessionalForm
        formId={formId}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </ProfileSettingsTabContentLayout>
  );
};
