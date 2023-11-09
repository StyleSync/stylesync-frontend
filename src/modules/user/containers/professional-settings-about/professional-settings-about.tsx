'use client';
import { type FC, useCallback, useId, useMemo } from 'react';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { AboutProfessionalForm } from '@/modules/user/components/about-professional-form';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// types
import type { AboutProfessionalFormValues } from '@/modules/user/components/about-professional-form/about-professional-form.interface';

export const ProfessionalSettingsAbout: FC = () => {
  const formId = useId();
  // queries
  const { data: me, ...meQuery } = trpc.user.me.useQuery();
  const { data: professional } = trpc.professional.get.useQuery(
    { id: me?.id ?? '', expand: [] },
    { enabled: meQuery.isSuccess, retry: false }
  );
  const userUpdateMutation = trpc.user.update.useMutation();
  // memo
  const initialValues = useMemo<Partial<AboutProfessionalFormValues>>(
    () => ({
      firstName: me?.firstName ?? undefined,
      lastName: me?.lastName ?? undefined,
      phone: me?.phone ?? undefined,
      email: me?.email ?? undefined,
      about: professional?.about ?? undefined,
      instagram: professional?.instagram ?? undefined,
      facebook: professional?.facebook ?? undefined,
    }),
    [me, professional]
  );

  const handleSubmit = useCallback(() => {}, []);

  return (
    <ProfileSettingsTabContentLayout
      title='About settings'
      icon='info'
      actions={[
        {
          text: 'Save',
          form: formId,
          isLoading: userUpdateMutation.isLoading,
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
