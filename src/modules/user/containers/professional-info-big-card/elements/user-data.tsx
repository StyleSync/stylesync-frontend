import { type FC } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import { AvatarSelect } from '@/modules/core/components/avatar-select';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import { Typography } from '@/modules/core/components/typogrpahy';
import { useImageInputState } from '@/modules/core/hooks/use-image-input-state';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import type { UserDataProps } from '@/modules/user/containers/professional-info-big-card/professional-info-big-card.interface';
import styles from '@/modules/user/containers/professional-info-big-card/professional-info-big-card.module.scss';
import { useAvatarUploadMutation } from '@/modules/user/hooks/use-avatar-upload-mutation';
import { getFullName } from '@/modules/user/utils/user.utils';

const ALIGN_OFFSET_UK = -130;
const ALIGN_OFFSET_EN = -85;

export const UserData: FC<UserDataProps> = ({ professional }) => {
  const isOpen = useBoolean();
  const intl = useIntl();
  const avatar = useImageInputState(professional.user.avatar);
  const avatarUpload = useAvatarUploadMutation();
  const queryClient = useQueryClient();

  const { mutateAsync: updateUser } = trpc.user.update.useMutation();

  const handleSelect = async (item: { id: string }) => {
    if (item.id === 'add') {
      const input = document.createElement('input');

      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];

        if (file) {
          try {
            const uploadedAvatar = await avatarUpload.mutateAsync(file);

            await updateUser(
              { avatar: uploadedAvatar.url },
              {
                onSuccess: () => {
                  const userMeKey = getQueryKey(trpc.user.me);
                  const professionalListKey = getQueryKey(
                    trpc.professional.list
                  );

                  queryClient.invalidateQueries({ queryKey: userMeKey });
                  queryClient.invalidateQueries({
                    queryKey: professionalListKey,
                  });

                  showToast({
                    variant: 'success',
                    title: intl.formatMessage({
                      id: 'user.avatar.update.success',
                    }),
                  });
                },
                onError: () => {
                  showToast({
                    variant: 'error',
                    title: intl.formatMessage({
                      id: 'user.avatar.update.error',
                    }),
                  });
                },
              }
            );

            avatar.onChange({ target: { files: [file] } } as any);
          } catch (error) {
            showToast({
              variant: 'error',
              title: intl.formatMessage({ id: 'user.avatar.upload.failed' }),
            });
          }
        }
      };

      input.click();
    }

    if (item.id === 'delete') {
      try {
        await updateUser({ avatar: null });
        avatar.onRemove();
        showToast({
          variant: 'success',
          title: intl.formatMessage({ id: 'user.avatar.remove.success' }),
        });
      } catch (error) {
        showToast({
          variant: 'error',
          title: intl.formatMessage({ id: 'user.avatar.remove.error' }),
        });
      }
    }

    isOpen.setFalse();
  };

  return (
    <div className='flex items-center gap-x-4 gap-y-4'>
      <DropdownMenu
        isOpen={isOpen.value}
        onClose={isOpen.setFalse}
        onSelect={handleSelect}
        items={[
          {
            id: 'add',
            variant: 'primary',
            icon: 'pencil',
            text: intl.formatMessage({ id: 'user.avatar.add' }),
          },
          {
            id: 'delete',
            variant: 'danger',
            icon: 'trash',
            text: intl.formatMessage({ id: 'user.avatar.delete' }),
          },
        ]}
        trigger={
          <button
            onMouseEnter={isOpen.setTrue}
            onMouseLeave={isOpen.setFalse}
            className='relative'
          >
            <AvatarSelect
              value={avatar.preview}
              onChange={avatar.onChange}
              onRemove={avatar.onRemove}
              size={80}
              hideActions
              isLoading={avatarUpload.isPending}
            />
          </button>
        }
        popoverProps={{
          align: 'end',
          alignOffset: intl.locale === 'uk' ? ALIGN_OFFSET_UK : ALIGN_OFFSET_EN,
          sideOffset: -1,
          disableAutofocus: true,
          classes: {
            content: 'min-w-[200px] hover:block',
          },
          onMouseEnter: isOpen.setTrue,
          onMouseLeave: isOpen.setFalse,
        }}
      />

      <div className='flex flex-col gap-y-2'>
        <Typography className='!text-white' variant='title' weight='medium'>
          {getFullName(professional.user)}
        </Typography>
        <div className={styles.proBadge}>
          <Typography variant='small' weight='medium'>
            STYLE PRO
          </Typography>
        </div>
      </div>
    </div>
  );
};
