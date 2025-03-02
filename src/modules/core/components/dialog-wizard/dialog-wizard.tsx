import { type FC } from 'react';

import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { Button } from '@/modules/core/components/button';
import { Dialog } from '@/modules/core/components/dialog';
import { Typography } from '@/modules/core/components/typogrpahy';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';

import type { DialogWizardProps } from './dialog-wizard.interface';

import styles from './dialog-wizard.module.scss';

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
  const intl = useIntl();

  const activeStep = steps.find((step) => step.id === activeStepId);

  return (
    <Dialog
      {...props}
      classes={{
        content: clsx(styles.content, classes?.content),
      }}
    >
      <div className='flex w-full flex-col'>
        {activeStep && (
          <div className='relative z-10 flex h-[60px] w-full items-center justify-center shadow sm:h-[44px]'>
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
                text={intl.formatMessage({ id: 'button.next' })}
                className='!absolute right-0 top-1/2 -translate-y-1/2 !border-none !text-base'
                onClick={(event) => {
                  onNext && onNext(activeStep.id);
                  event.preventDefault();
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
