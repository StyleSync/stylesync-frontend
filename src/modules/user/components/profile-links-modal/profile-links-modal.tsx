import { type FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
// hooks
import { useCopyToClipboard } from 'usehooks-ts';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';

// components
import { Icon } from '@/modules/core/components/icon';
import { DialogBottom } from '@/modules/core/components/dialog-bottom';
import { Dialog } from '@/modules/core/components/dialog';
import { Button } from '@/modules/core/components/button';
// types
import { type ProfileModalLinksProps } from './profile-links-modal.interface';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { generateProfileLink } from '@/modules/user/utils/generate-profile-link';

// icons
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  ViberShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  ViberIcon,
  WhatsappIcon,
} from 'react-share';

export const ProfileLinksModal: FC<ProfileModalLinksProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const deviceType = useDeviceType();
  const [value, copy] = useCopyToClipboard();
  const intl = useIntl();

  // queries
  const { data: me } = trpc.user.me.useQuery({
    expand: ['professional'],
  });

  // memo
  const DialogComponent = useMemo(() => {
    return deviceType === 'mobile' ? DialogBottom : Dialog;
  }, [deviceType]);

  const linkStyleSync = useMemo(() => {
    if (!me?.id) return '';

    return generateProfileLink(intl.locale, me.id);
  }, [intl.locale, me?.id]);

  return (
    <DialogComponent
      isCloseButtonVisible
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className='flex min-w-[350px] max-w-[512px] flex-col gap-6 p-6'>
        <span className='text-lg text-dark'>Share a link</span>
        <span className='text-[12px] text-gray'>
          We recommend adding a link to your business account on Instagram,
          Facebook, or any other platform you use to connect with your clients
        </span>
        <div
          onClick={() => copy(linkStyleSync)}
          className={`flex cursor-pointer items-center justify-between rounded-md bg-white px-[14px] py-[15px] shadow transition-colors duration-300 ${value ? 'border border-green' : ''}`}
        >
          <span className='truncate text-[11px]'>{linkStyleSync}</span>
          <Icon
            className={`${value ? 'text-green' : 'text-primary'}`}
            width={20}
            height={20}
            name='copy'
          />
        </div>
        <div className='ml-[10px] flex gap-5'>
          <EmailShareButton url={linkStyleSync} className='cursor-pointer'>
            <EmailIcon size={38} round />
          </EmailShareButton>

          <TelegramShareButton url={linkStyleSync} className='cursor-pointer'>
            <TelegramIcon size={38} round />
          </TelegramShareButton>

          <ViberShareButton url={linkStyleSync} className='cursor-pointer'>
            <ViberIcon size={38} round />
          </ViberShareButton>

          <FacebookShareButton url={linkStyleSync} className='cursor-pointer'>
            <FacebookIcon size={38} round />
          </FacebookShareButton>

          <WhatsappShareButton url={linkStyleSync} className='cursor-pointer'>
            <WhatsappIcon size={38} round />
          </WhatsappShareButton>
        </div>
        {deviceType === 'mobile' && (
          <Button
            onClick={() => onOpenChange(false)}
            className='!w-full'
            variant='secondary'
            text='Close'
          />
        )}
      </div>
    </DialogComponent>
  );
};
