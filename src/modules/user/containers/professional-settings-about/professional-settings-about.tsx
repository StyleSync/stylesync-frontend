'use client';
import { type FC, useCallback, useId, useMemo } from 'react';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { AboutProfessionalForm } from '@/modules/user/components/about-professional-form';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// constants
import { ERROR_MESSAGE } from '@/modules/core/constants/error-messages.constants';
// types
import type { AboutProfessionalFormValues } from '@/modules/user/components/about-professional-form/about-professional-form.interface';
import { showToast } from '@/modules/core/providers/toast-provider';

export const ProfessionalSettingsAbout: FC = () => {
  const formId = useId();
  // queries
  const { data: me, ...meQuery } = trpc.user.me.useQuery({
    expand: ['professional'],
  });
  const { mutate: meUpdateAsync, ...userUpdateMutation } =
    trpc.user.update.useMutation();
  const { mutate: professionalUpdate, ...professionalUpdateMutation } =
    trpc.professional.update.useMutation();
  // memo
  const initialValues = useMemo<Partial<AboutProfessionalFormValues>>(
    () => ({
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

  const handleSubmit = useCallback(
    async (values: AboutProfessionalFormValues & { avatar: File | null }) => {
      await meUpdateAsync({
        firstName: values.firstName || undefined,
        lastName: values.lastName || undefined,
        phone: values.phone || undefined,
      });

      professionalUpdate(
        {
          about: values.about || undefined,
          instagram: values.instagram || undefined,
          facebook: values.facebook || undefined,
        },
        {
          onSuccess: () => {
            meQuery.refetch();
          },
          onError: () => {
            showToast({
              variant: 'error',
              title: ERROR_MESSAGE.SOMETHING_WENT_WRONG,
              description:
                'Please review the entered data or try again later :)',
            });
          },
        }
      );
    },
    [meQuery, meUpdateAsync, professionalUpdate]
  );

  return (
    <ProfileSettingsTabContentLayout
      title='About settings'
      icon='info'
      actions={[
        {
          text: 'Save',
          form: formId,
          isLoading:
            userUpdateMutation.isLoading ||
            professionalUpdateMutation.isLoading,
          disabled: !me || !me.professional,
        },
      ]}
    >
      <AboutProfessionalForm
        formId={formId}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        isLoading={meQuery.isLoading}
      />
    </ProfileSettingsTabContentLayout>
  );
};
