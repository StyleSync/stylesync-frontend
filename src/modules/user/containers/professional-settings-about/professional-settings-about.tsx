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

export const ProfessionalSettingsAbout: FC = () => {
  const formId = useId();
  // queries
  const { data: me, ...meQuery } = trpc.user.me.useQuery({
    expand: ['professional'],
  });
  const userUpdate = trpc.user.update.useMutation({ useErrorBoundary: false });
  const proUpdate = trpc.professional.update.useMutation({
    useErrorBoundary: false,
  });
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
      Promise.all([
        userUpdate.mutateAsync({
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
    [meQuery, userUpdate, proUpdate]
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
          isLoading: userUpdate.isLoading || proUpdate.isLoading,
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
