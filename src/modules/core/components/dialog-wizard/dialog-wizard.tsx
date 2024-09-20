import { type FC } from 'react';

import type { DialogWizardProps } from './dialog-wizard.interface';
import { Dialog } from '@/modules/core/components/dialog';
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';

import styles from './dialog-wizard.module.scss';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import clsx from 'clsx';

export const DialogWizard: FC<DialogWizardProps> = ({
  steps,
  activeStepId,
  children,
  onNext,
  onBack,
  isNextLoading,
  classes,
  handleModalClose,
  ...props
}) => {
  const deviceType = useDeviceType();

  const activeStep = steps.find((step) => step.id === activeStepId);

  activeStep?.id;

  return (
    <Dialog
      {...props}
      classes={{
        content: clsx(styles.content, classes?.content),
      }}
    >
      <div className='flex w-full flex-col'>
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
            {activeStep.isNext && deviceType !== 'mobile' && (
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
            {activeStep.id === 'service' && deviceType === 'mobile' && (
              <Button
                className='!absolute right-2 top-1/2 z-10 -translate-y-1/2 !border-none !text-base'
                onClick={handleModalClose}
                variant='unstyled'
                icon='close'
              />
            )}
          </div>
        )}
        {children}
      </div>
    </Dialog>
  );
};
