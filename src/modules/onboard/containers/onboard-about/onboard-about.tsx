import { type FC, useCallback, useId, useMemo } from 'react';

import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';

import { ErrorBox } from '@/modules/core/components/error-box';
import { Placeholder } from '@/modules/core/components/placeholder';
import { Spinner } from '@/modules/core/components/spinner';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { OnboardLayout } from '@/modules/onboard/components/onboard-layout';
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';
import { AboutProfessionalForm } from '@/modules/user/components/about-professional-form';
import type { AboutProfessionalFormValues } from '@/modules/user/components/about-professional-form/about-professional-form.interface';
import { useAvatarUploadMutation } from '@/modules/user/hooks/use-avatar-upload-mutation';

export const OnboardAbout: FC<ProOnboardStepProps> = ({ next }) => {
  const intl = useIntl();
  const formId = useId();
  const router = useRouter();

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
      nickname: me?.nickname ?? undefined,
      tiktok: me?.professional?.tiktok ?? undefined,
    }),
    [me]
  );

  const handleRefresh = useCallback(() => {
    void meQuery.refetch();
  }, [meQuery]);

  const handleSubmit = useCallback(
    async (
      values: AboutProfessionalFormValues & { avatar?: File | string | null },
      onError: (error: any) => void
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

      try {
        await meUpdateAsync({
          avatar: avatarUrl,
          nickname: values.nickname || undefined,
          firstName: values.firstName || undefined,
          lastName: values.lastName || undefined,
          phone: values.phone || undefined,
          onboardingCompleted: me.userType === 'CUSTOMER',
        });

        if (me.userType === 'PROFESSIONAL') {
          professionalMutation(
            {
              about: values.about || undefined,
              instagram: values.instagram || undefined,
              facebook: values.facebook || undefined,
              tiktok: values.tiktok || undefined,
            },
            {
              onSuccess: () => {
                meQuery.refetch();
                next();
              },
              onError: (error: any) => {
                showToast({
                  variant: 'error',
                  title: intl.formatMessage({
                    id: 'onboard.about.toast.error.title',
                  }),
                  description: intl.formatMessage({
                    id: 'onboard.about.toast.error.description',
                  }),
                });
                if (error) {
                  onError(error);
                }
              },
            }
          );
        }

        if (me.userType === 'CUSTOMER') {
          router.push(`/app/my-bookings`);
        }
      } catch (error) {
        if (error) {
          onError(error);
        }
      }
    },
    [
      me,
      meQuery,
      meUpdateAsync,
      next,
      professionalCreate,
      professionalUpdate,
      intl,
      avatarUpload,
      router,
    ]
  );

  return (
    <OnboardLayout
      meta={{
        title: intl.formatMessage({ id: 'onboard.about.title' }),
      }}
      nextButtonProps={{
        text:
          me?.userType === 'CUSTOMER'
            ? intl.formatMessage({ id: 'button.save' })
            : intl.formatMessage({ id: 'button.next' }),
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
              title={intl.formatMessage({ id: 'onboard.errorBox.title' })}
              description={intl.formatMessage({
                id: 'onboard.errorBox.description',
              })}
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
