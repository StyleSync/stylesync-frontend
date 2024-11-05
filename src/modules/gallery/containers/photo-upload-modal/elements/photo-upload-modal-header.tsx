import { type FC, useMemo } from 'react';
import { useIntl } from 'react-intl';

// components
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';

import type {
  PhotoUploadModalHeaderProps,
  PhotoUploadStep,
} from '../photo-upload-modal.interface';

export const PhotoUploadModalHeader: FC<PhotoUploadModalHeaderProps> = ({
  state,
  onBackClick,
  onNextClick,
  onSaveClick,
  isSaveLoading,
}) => {
  const intl = useIntl();

  // memo
  const metadata: Record<PhotoUploadStep, { title: string }> = useMemo(
    () => ({
      select: {
        title: intl.formatMessage({ id: 'photo.upload.modal.header.select' }),
      },
      crop: {
        title: intl.formatMessage({ id: 'photo.upload.modal.header.crop' }),
      },
      details: {
        title: intl.formatMessage({ id: 'photo.upload.modal.header.details' }),
      },
      preview: {
        title: intl.formatMessage({ id: 'photo.upload.modal.header.preview' }),
      },
    }),
    [intl]
  );

  const { title } = metadata[state.step];

  return (
    <div className='relative z-10 flex h-[64px] w-full items-center justify-center shadow md:h-[44px]'>
      {state.step !== 'select' && state.step !== 'preview' && (
        <Button
          variant='outlined'
          icon='arrow-left'
          className='!absolute left-0 top-1/2 ml-2 -translate-y-1/2 !border-none !text-dark'
          onClick={onBackClick}
        />
      )}
      <Typography variant='body1' weight='medium'>
        {title}
      </Typography>
      {state.step !== 'select' && (
        <Button
          variant='outlined'
          rippleColor='transparent'
          isLoading={isSaveLoading}
          text={state.step === 'crop' ? 'Next' : 'Save'}
          className='!absolute right-0 top-1/2 -translate-y-1/2 !border-none !text-base'
          onClick={state.step === 'crop' ? onNextClick : onSaveClick}
        />
      )}
    </div>
  );
};
