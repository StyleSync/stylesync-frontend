import type { FC } from 'react';
// components
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';

import type {
  PhotoUploadModalHeaderProps,
  PhotoUploadStep,
} from '../photo-upload-modal.interface';

const metadata: Record<PhotoUploadStep, { title: string }> = {
  select: {
    title: 'Select new photo',
  },
  crop: {
    title: 'Crop',
  },
  details: {
    title: 'Upload new photo',
  },
  preview: {
    title: 'Display photo',
  },
};

export const PhotoUploadModalHeader: FC<PhotoUploadModalHeaderProps> = ({
  state,
  onBackClick,
  onNextClick,
  onSaveClick,
  isSaveLoading,
}) => {
  const { title } = metadata[state.step];

  return (
    <div className='w-full z-10 relative shadow h-[44px] flex items-center justify-center'>
      {state.step !== 'select' && state.step !== 'preview' && (
        <Button
          variant='outlined'
          icon='arrow-left'
          className='!border-none ml-2 !text-dark !absolute top-1/2 -translate-y-1/2 left-0'
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
