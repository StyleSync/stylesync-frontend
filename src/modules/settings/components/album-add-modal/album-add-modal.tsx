import { useEffect, type FC } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// hooks
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
// components
import { Dialog } from '@/modules/core/components/dialog';
import { Typography } from '@/modules/core/components/typogrpahy';
import { TextField } from '@/modules/core/components/text-field';
import { Button } from '@/modules/core/components/button';
// types
import { type AlbumAddModalProps } from './album-add-modal.interface';
import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { showToast } from '@/modules/core/providers/toast-provider';

// styles
import styles from './album-add-modal.module.scss';

const defaultValues = {
  title: '',
};

const albumValidationSchema = z.object({
  title: z.string().min(1),
});

export type albomFormValue = z.infer<typeof albumValidationSchema>;

export const AlbumAddModal: FC<
  Omit<DialogProps, 'children'> & AlbumAddModalProps
> = ({ album, ...props }) => {
  const queryClient = useQueryClient();
  // mutations
  const createAlbumMutation = trpc.album.create.useMutation();
  const renameAlbumMutation = trpc.album.update.useMutation();

  // form
  const form = useForm<albomFormValue>({
    defaultValues,
    resolver: zodResolver(albumValidationSchema),
  });

  useEffect(() => {
    if (props.isOpen === false) {
      form.reset();

      return;
    }

    if (album) {
      form.reset({ title: album.title });
    }
  }, [props.isOpen, form, album]);

  const handleSubmit = (data: albomFormValue) => {
    if (album) {
      renameAlbumMutation.mutate(
        {
          id: album.id,
          title: data.title,
        },
        {
          onError: () => {
            showToast({
              variant: 'error',
              title: 'Oops, error',
              description: 'Error',
            });
          },
          onSuccess: () => {
            showToast({
              variant: 'success',
              title: 'Good!',
              description: 'Album edit',
            });

            queryClient.invalidateQueries({
              queryKey: getQueryKey(trpc.album.list),
            });

            props.onOpenChange(false);
          },
        }
      );
    }

    if (!album) {
      createAlbumMutation.mutate(data, {
        onError: () => {
          showToast({
            variant: 'error',
            title: 'Oops, error',
            description: 'Error',
          });
        },
        onSuccess: () => {
          showToast({
            variant: 'success',
            title: 'Good!',
            description: 'Album added',
          });

          queryClient.invalidateQueries({
            queryKey: getQueryKey(trpc.album.list),
          });

          props.onOpenChange(false);
        },
      });
    }
  };

  const handleCloseClick = () => {
    if (props.onOpenChange) {
      props.onOpenChange(false);
    }
  };

  return (
    <Dialog {...props} classes={{ content: styles.content }}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={styles.root}>
        <Typography variant='subtitle'>
          {album ? 'Edit album' : 'Add album'}
        </Typography>

        <TextField
          label='Album title'
          variant='input'
          {...form.register('title')}
        />
        <div className={styles.btns}>
          <Button
            onClick={handleCloseClick}
            variant='secondary'
            text='Cansel'
          />
          <Button
            isLoading={
              createAlbumMutation.isLoading || renameAlbumMutation.isLoading
            }
            type='submit'
            text='Save'
          />
        </div>
      </form>
    </Dialog>
  );
};
