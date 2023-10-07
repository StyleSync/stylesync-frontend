import { type FC } from 'react';
// components
import { Button, Typography } from '@/modules/core/components';

import type { ProfessionalQuizletWizardStepLayoutProps } from './professional-quizlet-wizard-step-layout.interface';
import styles from './professional-quizlet-wizard-step-layout.module.scss';

export const ProfessionalQuizletWizardStepLayout: FC<
  ProfessionalQuizletWizardStepLayoutProps
> = ({ children, meta, prevButtonProps, nextButtonProps }) => {
  return (
    <div className={styles.root}>
      {meta && (
        <div className={styles.mobileInfo}>
          <Typography variant='subtitle'>{meta.title}</Typography>
          <Typography As='p' variant='small'>
            {meta.description}
          </Typography>
        </div>
      )}
      {children}
      <div className={styles.actions}>
        {prevButtonProps && (
          <Button
            className={styles.action}
            text='Back'
            variant='secondary'
            {...prevButtonProps}
          />
        )}
        <Button className={styles.action} text='Next' {...nextButtonProps} />
      </div>
    </div>
  );
};
