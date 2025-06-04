'use client';
import { type FC, Suspense, useEffect, useId } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';
import { z } from 'zod';

import { Button } from '@/modules/core/components/button';
import { TextField } from '@/modules/core/components/text-field';
import { useDebounce } from '@/modules/core/hooks/use-debounce';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { AboutMe } from '@/modules/user/components/about-me';
import { ProfileSectionLayout } from '@/modules/user/components/profile-section-layout';

import type { ProfileSectionLayoutAboutProps } from './profile-section-layout-about.interface';

const THOUSAND = 1000;

type AboutFormValues = {
  about: string;
};

const defaultValues: AboutFormValues = {
  about: '',
};

const schemaAbout: z.Schema<AboutFormValues> = z.object({
  about: z.string().max(THOUSAND),
});

export const ProfileSectionLayoutAbout: FC<ProfileSectionLayoutAboutProps> = ({
  userId,
}) => {
  const intl = useIntl();
  const isEdiAbout = useBoolean();
  const queryClient = useQueryClient();
  const formId = useId();

  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: ['user'],
  });

  const { reset, watch, handleSubmit, ...form } = useForm<AboutFormValues>({
    defaultValues,
    resolver: zodResolver(schemaAbout),
  });

  useEffect(() => {
    if (professional?.about) {
      reset({ about: professional.about });
    }
  }, [professional?.about, reset]);

  const aboutValue = watch('about', '');
  const debounceAbout = useDebounce(aboutValue);

  const professionalUpdate = trpc.professional.update.useMutation();

  const getErrorMessage = (errorKey: string | undefined) => {
    if (errorKey) {
      return intl.formatMessage({ id: errorKey });
    }
  };

  const onCancel = () => {
    isEdiAbout.setFalse();
  };

  const onSave = handleSubmit((data) => {
    professionalUpdate.mutate(
      {
        about: data.about,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getQueryKey(trpc.professional.get, { id: userId }),
          });
          showToast({
            variant: 'success',
            title: intl.formatMessage({ id: 'toast.about.success.title' }),
          });
          isEdiAbout.setFalse();
        },
        onError: () => {
          showToast({
            variant: 'error',
            title: intl.formatMessage({ id: 'toast.about.error.title' }),
          });
        },
      }
    );
  });

  return (
    <ProfileSectionLayout
      edit={isEdiAbout.value}
      title='pro.layout.title.about'
      id='about-me'
      onEdit={isEdiAbout.toggle}
      onCancel={onCancel}
    >
      <Suspense
        fallback={
          <div className='flex flex-col gap-y-2'>
            <div className='skeleton flex h-4 w-[70%] rounded' />
            <div className='skeleton flex h-4 w-[80%] rounded' />
            <div className='skeleton flex h-4 w-[50%] rounded' />
          </div>
        }
      >
        {isEdiAbout.value ? (
          <form className='flex flex-col gap-y-6' id={formId} onSubmit={onSave}>
            <TextField
              charCount={debounceAbout?.length}
              {...form.register('about')}
              showCharacterCount
              maxCharacterCount={1000}
              error={getErrorMessage(form.formState.errors.about?.message)}
              variant='textarea'
              label={intl.formatMessage({
                id: 'user.about.professional.form.about',
              })}
              style={{ height: 200, resize: 'none' }}
            />
            {isEdiAbout.value && (
              <Button
                className='ml-auto'
                variant='primary'
                text={intl.formatMessage({ id: 'button.save' })}
                type='submit'
                form={formId}
              />
            )}
          </form>
        ) : (
          <AboutMe userId={userId} />
        )}
      </Suspense>
    </ProfileSectionLayout>
  );
};
