import { type FC, useCallback, useId, useMemo } from 'react';
// components
import { AboutProfessionalForm } from '@/modules/user/components/about-professional-form';
import { ProfessionalQuizletWizardStepLayout } from '@/modules/user/components/professional-quizlet-wizard-step-layout';
import { ErrorBox } from '@/modules/core/components/error-box';
import { Placeholder } from '@/modules/core/components/placeholder';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { showToast } from '@/modules/core/providers/toast-provider';
// types
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';

import type { AboutProfessionalFormValues } from '@/modules/user/components/about-professional-form/about-professional-form.interface';

export const OnboardAbout: FC<ProOnboardStepProps> = ({ next }) => {
  const formId = useId();
  // queries
  const { data: me, ...meQuery } = trpc.user.me.useQuery({
    expand: ['professional'],
  });
  const { mutateAsync: meUpdateAsync, ...meUpdateMutation } =
    trpc.user.update.useMutation();
  const { mutate: professionalCreate, ...professionalCreateMutation } =
    trpc.professional.create.useMutation();
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

  const handleRefresh = useCallback(() => {
    void meQuery.refetch();
  }, [meQuery]);

  const handleSubmit = useCallback(
    async (values: AboutProfessionalFormValues & { avatar: File | null }) => {
      if (!me) {
        return;
      }

      const professionalMutation = me.professional
        ? professionalUpdate
        : professionalCreate;

      await meUpdateAsync({
        firstName: values.firstName || undefined,
        lastName: values.lastName || undefined,
        phone: values.phone || undefined,
      });

      professionalMutation(
        {
          about: values.about || undefined,
          instagram: values.instagram || undefined,
          facebook: values.facebook || undefined,
        },
        {
          onSuccess: () => {
            meQuery.refetch();
            next();
          },
          onError: () => {
            showToast({
              variant: 'error',
              title: 'Ooops, something went wrong...',
              description:
                'Please review the entered data or try again later :)',
            });
          },
        }
      );
    },
    [me, meUpdateAsync, next, professionalCreate, professionalUpdate]
  );

  return (
    <ProfessionalQuizletWizardStepLayout
      meta={{
        title: 'About',
        description:
          'We will use this information to create a detailed account of your experience that can be shared with your clients',
      }}
      nextButtonProps={{
        form: formId,
        isLoading:
          professionalUpdateMutation.isLoading ||
          professionalCreateMutation.isLoading ||
          meUpdateMutation.isLoading,
        disabled: meQuery.isLoading || meQuery.isError,
      }}
    >
      <Placeholder
        isActive={meQuery.isError}
        placeholder={
          <ErrorBox
            title='Connection with server has been interrupted'
            description='Please check your internet connection or try refreshing the page. If the issue persists, please contact our support team for assistance.'
            refresh={handleRefresh}
          />
        }
      >
        <AboutProfessionalForm
          formId={formId}
          onSubmit={handleSubmit}
          isLoading={meQuery.isLoading}
          initialValues={initialValues}
        />
      </Placeholder>
    </ProfessionalQuizletWizardStepLayout>
  );
};
