import { type FC, Fragment } from 'react';
import clsx from 'clsx';
// components
import { Typography } from '@/modules/core/components';

import type { StepperProps } from './stepper.interface';
import styles from './stepper.module.scss';

export const Stepper: FC<StepperProps> = ({
  value,
  steps,
  vertical,
  typographyProps,
  classes,
}) => {
  return (
    <div
      className={clsx(
        styles.root,
        { [styles.vertical]: vertical },
        classes?.root
      )}
    >
      {steps.map((step, index) => {
        const isActive = step.value === value;
        const isPassed =
          index < steps.findIndex((_step) => _step.value === value);

        return (
          <Fragment key={step.value}>
            <div className={clsx(styles.step, classes?.step)}>
              <div
                className={clsx(styles.badge, {
                  [styles.badge_active]: isActive,
                  [styles.badge_passed]: isPassed,
                })}
              >
                <Typography className={styles.badgeText} weight='regular'>
                  {index + 1}
                </Typography>
                <div className={styles.badgeSplash} />
              </div>
              <Typography
                className={clsx(styles.stepText, {
                  [styles.stepText_active]: isActive,
                  [styles.stepText_passed]: isPassed,
                })}
                variant='small'
                weight='medium'
                {...typographyProps}
              >
                {step.text}
              </Typography>
            </div>
            {index < steps.length - 1 && (
              <div className={clsx(styles.line, classes?.line)}>
                <div
                  className={clsx(styles.lineProgress, {
                    [styles.lineProgress_active]: isPassed,
                  })}
                />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
