import { type FC, useCallback, useId, useMemo } from 'react';
// components
import { ErrorBox } from '@/modules/core/components/error-box';
import { Placeholder } from '@/modules/core/components/placeholder';
import { OnboardLayout } from '@/modules/onboard/components/onboard-layout';
import { AboutProfessionalForm } from '@/modules/user/components/about-professional-form';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { showToast } from '@/modules/core/providers/toast-provider';
// types
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';

import type { AboutProfessionalFormValues } from '@/modules/user/components/about-professional-form/about-professional-form.interface';
import { Spinner } from '@/modules/core/components/spinner';
import { useAvatarUploadMutation } from '@/modules/user/hooks/use-avatar-upload-mutation';

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

  const handleRefresh = useCallback(() => {
    void meQuery.refetch();
  }, [meQuery]);

  const handleSubmit = useCallback(
    async (
      values: AboutProfessionalFormValues & { avatar?: File | string | null }
    ) => {
      if (!me) {
        return;
      }

      const professionalMutation = me.professional
        ? professionalUpdate
        : professionalCreate;

      // todo: duplicated code, design more consistent user/professional update
      let avatarUrl: string | null = null;

      if (values.avatar) {
        if (typeof values.avatar === 'object') {
          const uploadedAvatar = await avatarUpload.mutateAsync(values.avatar);

          avatarUrl = uploadedAvatar.url;
        } else {
          avatarUrl = values.avatar as string;
        }
      }

      await meUpdateAsync({
        avatar: avatarUrl,
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
    [me, meQuery, meUpdateAsync, next, professionalCreate, professionalUpdate]
  );

  return (
    <OnboardLayout
      meta={{
        title: 'About me',
      }}
      nextButtonProps={{
        form: formId,
        isLoading:
          professionalUpdateMutation.isLoading ||
          professionalCreateMutation.isLoading ||
          meUpdateMutation.isLoading,
        disabled: meQuery.isLoading || meQuery.isError,
        type: 'submit',
      }}
    >
      <Placeholder
        isActive={meQuery.isLoading}
        placeholder={<Spinner size='medium' />}
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
            initialValues={initialValues}
          />
        </Placeholder>
      </Placeholder>
    </OnboardLayout>
  );
};
