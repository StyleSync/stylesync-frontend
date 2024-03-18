import { useEffect, type FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// components
import { Dialog } from '@/modules/core/components/dialog';
import { Typography } from '@/modules/core/components/typogrpahy';
import { ImageSelector } from '@/modules/core/components/image-selector';
import { TextField } from '@/modules/core/components/text-field';
import { Button } from '@/modules/core/components/button';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// hooks
import { useImageUploadMutation } from '@/modules/user/hooks/use-image-upload-mutation';
// type
import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';
// style
import styles from './photo-upload-modal.module.scss';
import { Emoji } from '@/modules/core/components/emoji';
import { showToast } from '@/modules/core/providers/toast-provider';

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

export const PhotoUploadModal: FC<Omit<DialogProps, 'children'>> = ({
  ...props
}) => {
  const portfolioCreateMutation = trpc.portfolio.create.useMutation();

  const uploadMutation = useImageUploadMutation();

  const form = useForm<PhotoValue>({
    defaultValues,
    resolver: zodResolver(photoValidationSchema),
  });

  const onSubmit = async (values: PhotoValue) => {
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
            title: 'Good',
            description: '!',
          });
        },
      }
    );
  };

  useEffect(() => {
    if (!props.isOpen) {
      form.reset();
    }
  }, [props.isOpen, form]);

  return (
    <Dialog {...props} classes={{ content: styles.content }}>
      <div className={styles.root}>
        <div className={styles.header}>
          <Typography variant='subtitle'>Add your image</Typography>
          <Emoji height={35} name='girl' width={35} />
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
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
