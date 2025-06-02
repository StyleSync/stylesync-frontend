import { type FC, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { sendGTMEvent } from '@next/third-parties/google';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { Button } from '@/modules/core/components/button';
import { Dialog } from '@/modules/core/components/dialog';
import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';
import { TextField } from '@/modules/core/components/text-field';
import { Typography } from '@/modules/core/components/typogrpahy';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';

import { type AlbumAddModalProps } from './album-add-modal.interface';

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
  const intl = useIntl();
  const queryClient = useQueryClient();
  // queries
  const { data: me } = trpc.user.me.useQuery();
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
              title: intl.formatMessage({
                id: 'albumAdd.modal.toast.error.title.edit',
              }),
              description: intl.formatMessage({
                id: 'albumAdd.modal.toast.error.description.edit',
              }),
            });
          },
          onSuccess: () => {
            if (me?.userType === 'PROFESSIONAL') {
              sendGTMEvent({
                event: 'data_submit',
                user_id: me?.id,
                user_email: me?.email,
                data: {
                  type: 'gallery',
                  action: 'edit',
                  title: Boolean(data.title),
                },
              });
            }

            showToast({
              variant: 'success',
              title: intl.formatMessage({
                id: 'albumAdd.modal.toast.success.description.edit',
              }),
              description: '',
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
            title: intl.formatMessage({
              id: 'albumAdd.modal.toast.error.title.add',
            }),
            description: intl.formatMessage({
              id: 'albumAdd.modal.toast.error.description.add',
            }),
          });
        },
        onSuccess: () => {
          if (me?.userType === 'PROFESSIONAL') {
            sendGTMEvent({
              event: 'data_submit',
              user_id: me?.id,
              user_email: me?.email,
              data: {
                type: 'gallery',
                action: 'create',
                title: Boolean(data.title),
              },
            });
          }

          showToast({
            variant: 'success',
            title: intl.formatMessage({
              id: 'albumAdd.modal.toast.success.description.add',
            }),
            description: '',
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
    <Dialog
      {...props}
      classes={{ content: styles.content, overlay: styles.dialogOverlay }}
    >
      <form onSubmit={form.handleSubmit(handleSubmit)} className={styles.root}>
        <div className='flex items-center gap-3'>
          <Typography variant='subtitle'>
            {intl.formatMessage({
              id: !album
                ? 'albumAdd.modal.title.add'
                : 'albumAdd.modal.title.edit',
            })}
          </Typography>
        </div>
        <TextField
          label={intl.formatMessage({ id: 'albumAdd.modal.label.input' })}
          variant='input'
          {...form.register('title')}
        />
        <div className={styles.btns}>
          <Button
            onClick={handleCloseClick}
            variant='secondary'
            text={intl.formatMessage({ id: 'button.cancel' })}
          />
          <Button
            isLoading={
              createAlbumMutation.isPending || renameAlbumMutation.isPending
            }
            type='submit'
            text={intl.formatMessage({ id: 'button.save' })}
          />
        </div>
      </form>
    </Dialog>
  );
};
