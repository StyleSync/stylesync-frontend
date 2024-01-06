'use client';
import { type FC, useCallback, useId, useMemo } from 'react';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { AboutProfessionalForm } from '@/modules/user/components/about-professional-form';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { showToast } from '@/modules/core/providers/toast-provider';
// constants
import { ERROR_MESSAGE } from '@/modules/core/constants/error-messages.constants';
// types
import type { AboutProfessionalFormValues } from '@/modules/user/components/about-professional-form/about-professional-form.interface';
import { useAvatarUploadMutation } from '@/modules/user/hooks/use-avatar-upload-mutation';

export const ProfessionalSettingsAbout: FC = () => {
  const formId = useId();
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
      about: me?.professional?.about ?? undefined,
      instagram: me?.professional?.instagram ?? undefined,
      facebook: me?.professional?.facebook ?? undefined,
    }),
    [me]
  );
  const isSaveLoading =
    userUpdate.isLoading || proUpdate.isLoading || avatarUpload.isLoading;

  const handleSubmit = useCallback(
    async (
      values: AboutProfessionalFormValues & { avatar?: File | string | null }
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
        }),
        proUpdate.mutateAsync({
          about: values.about || undefined,
          instagram: values.instagram || undefined,
          facebook: values.facebook || undefined,
        }),
      ])
        .then(() => {
          meQuery.refetch();
          showToast({
            variant: 'success',
            title: 'All done!',
            description: 'Changes has been saved',
          });
        })
        .catch(() => {
          showToast({
            variant: 'error',
            title: ERROR_MESSAGE.SOMETHING_WENT_WRONG,
            description: 'Please review the entered data or try again later',
          });
        });
    },
    [userUpdate, proUpdate, avatarUpload, meQuery]
  );

  return (
    <ProfileSettingsTabContentLayout
      title='About settings'
      icon='info'
      isLoading={meQuery.isLoading}
      actions={[
        {
          text: 'Save',
          form: formId,
          isLoading: isSaveLoading,
          disabled: !me || !me.professional,
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
