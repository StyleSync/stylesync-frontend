import { type FC } from 'react';

import type { DialogWizardProps } from './dialog-wizard.interface';
import { Dialog } from '@/modules/core/components/dialog';
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';

export const DialogWizard: FC<DialogWizardProps> = ({
  steps,
  activeStepId,
  children,
  onNext,
  onBack,
  isNextLoading,
  ...props
}) => {
  const activeStep = steps.find((step) => step.id === activeStepId);

  return (
    <Dialog {...props}>
      <div className='flex flex-col'>
        {activeStep && (
          <div className='relative z-10 flex h-[44px] w-full items-center justify-center shadow'>
            {activeStep.isBack && (
              <Button
                variant='outlined'
                icon='arrow-left'
                className='!absolute left-0 top-1/2 ml-2 -translate-y-1/2 !border-none !text-dark'
                onClick={() => {
                  onBack && onBack(activeStep.id);
                }}
              />
            )}
            <Typography variant='body1' weight='medium'>
              {activeStep.title}
            </Typography>
            {activeStep.isNext && (
              <Button
                variant='outlined'
                rippleColor='transparent'
                isLoading={isNextLoading}
                text={'Next'}
                className='!absolute right-0 top-1/2 -translate-y-1/2 !border-none !text-base'
                onClick={() => {
                  onNext && onNext(activeStep.id);
                }}
                {...activeStep.nextBtnProps}
              />
            )}
          </div>
        )}
        {children}
      </div>
    </Dialog>
  );
};
