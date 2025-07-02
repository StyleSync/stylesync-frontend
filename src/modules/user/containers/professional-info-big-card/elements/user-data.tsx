import { type FC } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import { AvatarSelect } from '@/modules/core/components/avatar-select';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import { useImageInputState } from '@/modules/core/hooks/use-image-input-state';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import type { UserDataProps } from '@/modules/user/containers/professional-info-big-card/professional-info-big-card.interface';
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
    <div className='relative flex w-full items-center p-4'>
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
            className='absolute -top-[40px] left-1/2 -translate-x-1/2'
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

      <div className='mt-8 flex w-full flex-col items-center gap-y-2'>
        <span className='text-lg font-semibold text-dark'>
          {getFullName(professional.user)}
        </span>{' '}
        <span className='text-sm font-medium text-gray-accent'>Спеціаліст</span>
      </div>
    </div>
  );
};
