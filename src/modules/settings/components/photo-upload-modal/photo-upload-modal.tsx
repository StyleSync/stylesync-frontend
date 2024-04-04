import { useEffect, type FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

// form
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// components
import { Dialog } from '@/modules/core/components/dialog';
import { Typography } from '@/modules/core/components/typogrpahy';
import { ImageSelector } from '@/modules/core/components/image-selector';
import { TextField } from '@/modules/core/components/text-field';
import { Button } from '@/modules/core/components/button';
import { Emoji } from '@/modules/core/components/emoji';

// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { showToast } from '@/modules/core/providers/toast-provider';

// hooks
import { useImageUploadMutation } from '@/modules/user/hooks/use-image-upload-mutation';
// type
import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';
import type { PhotoUploadProps } from './photo-upload-modal.interface';
// style
import styles from './photo-upload-modal.module.scss';

const defaultValues = {
  title: '',
  comment: '',
  image: null,
};

const photoValidationSchema = z.object({
  title: z.string(),
  comment: z.string(),
  image: z.any(),
});

export type PhotoValue = z.infer<typeof photoValidationSchema>;

export const PhotoUploadModal: FC<
  Omit<DialogProps, 'children'> & PhotoUploadProps
> = ({ ...props }) => {
  const queryClient = useQueryClient();

  // query
  const uploadedPortfolio = trpc.portfolio.get.useQuery(
    {
      id: props.imageId || '',
    },
    {
      enabled: !!props.imageId,
    }
  );

  // mutations
  const uploadMutation = useImageUploadMutation();
  const portfolioCreateMutation = trpc.portfolio.create.useMutation();
  const portfolioUpdateMutation = trpc.portfolio.update.useMutation();

  const form = useForm<PhotoValue>({
    defaultValues,
    resolver: zodResolver(photoValidationSchema),
  });

  const onSubmit = async (values: PhotoValue) => {
    if (props.imageId) {
      portfolioUpdateMutation.mutate(
        {
          id: props.imageId,
          title: values.title,
          description: values.comment,
        },
        {
          onError: () => {
            showToast({
              variant: 'error',
              title: 'Oops, error',
              description: 'Oops',
            });
          },
          onSuccess: () => {
            showToast({
              variant: 'success',
              title: 'Good!',
              description: 'Editing completed',
            });

            queryClient.invalidateQueries({
              queryKey: trpc.portfolio.get.getQueryKey({
                id: props.imageId || '',
              }),
            });

            queryClient.invalidateQueries({
              queryKey: trpc.portfolio.list.getQueryKey(),
            });

            props.onOpenChange(false);
          },
        }
      );

      return;
    }

    const uploadedImage = await uploadMutation.mutateAsync(values.image);

    portfolioCreateMutation.mutate(
      {
        title: values.title,
        link: uploadedImage.url,
        description: values.comment,
      },
      {
        onError: () => {
          showToast({
            variant: 'error',
            title: 'Oops, error',
            description: 'Oops',
          });
        },
        onSuccess: () => {
          showToast({
            variant: 'success',
            title: 'Good!',
            description: 'Photo added',
          });

          queryClient.invalidateQueries({
            queryKey: trpc.portfolio.list.getQueryKey(),
          });

          props.onOpenChange(false);
        },
      }
    );
  };

  useEffect(() => {
    if (!props.isOpen) {
      form.reset();
    }

    if (uploadedPortfolio.data) {
      form.reset({
        title: uploadedPortfolio.data.title,
        comment: uploadedPortfolio.data.description || '',
      });
    }
  }, [props.isOpen, form, uploadedPortfolio.data]);

  return (
    <Dialog {...props} classes={{ content: styles.content }}>
      <div className={styles.root}>
        <div className={styles.header}>
          {props.imageId && (
            <Typography variant='subtitle'>Edit your image</Typography>
          )}
          {!props.imageId && (
            <>
              <Typography variant='subtitle'>Add your image</Typography>
              <Emoji height={35} name='girl' width={35} />
            </>
          )}
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          {!props.imageId && (
            <Controller
              control={form.control}
              name='image'
              render={({ field }) => (
                <ImageSelector
                  onImageSelected={(files) => {
                    field.onChange(files[0]);
                  }}
                  value={field.value?.fileName}
                  width={220}
                  height={220}
                  label='Press here'
                  type='file'
                />
              )}
            />
          )}
          {props.imageId && (
            <Image
              className={styles.image}
              alt='image'
              width={100}
              height={100}
              src={uploadedPortfolio.data?.link || ''}
            />
          )}

          <TextField
            {...form.register('title')}
            error={Boolean(form.formState.errors.title)}
            label='Title*'
            variant='input'
          />
          <TextField
            {...form.register('comment')}
            error={Boolean(form.formState.errors.comment)}
            label='Comment'
            variant='textarea'
          />
          <Button
            isLoading={
              portfolioCreateMutation.isLoading ||
              uploadMutation.isLoading ||
              portfolioUpdateMutation.isLoading
            }
            className={styles.btnSave}
            text='Save'
            variant='primary'
            type='submit'
          />
        </form>
      </div>
    </Dialog>
  );
};
