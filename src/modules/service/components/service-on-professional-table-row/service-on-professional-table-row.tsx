import React, { type FC, useRef } from 'react';
import clsx from 'clsx';
import * as Accordion from '@radix-ui/react-accordion';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';
// containers
import { CreateBooking } from '@/modules/booking/containers/create-booking-container';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { useRipple } from '@/modules/core/hooks/use-ripple';
// utils
import { formatMinutesDuration } from '@/modules/core/utils/time.utils';
// type
import type { ServiceOnProfessionalTableRowProps } from './service-on-professional-table-row.interface';
import styles from './service-on-professional-table-row.module.scss';
import { Button } from '@/modules/core/components/button';
import { EditorComponent } from '@/modules/core/components/editor';

export const ServiceOnProfessionalTableRow: FC<
  ServiceOnProfessionalTableRowProps
> = ({ data, isOwn, professional }) => {
  const deviceType = useDeviceType();
  // refs
  const rootRef = useRef<HTMLDivElement>(null);

  useRipple(rootRef, {
    disabled: deviceType !== 'mobile',
  });

  return (
    <Accordion.Item className={styles.acardionItem} value={data.id}>
      <Accordion.Header>
        <div className={styles.root} ref={rootRef}>
          <div className={clsx(styles.cell, styles.vertical, styles.flex75)}>
            <Typography className={styles.title} variant='body1'>
              {data.title}
            </Typography>
            <Typography className={styles.duration} variant='small'>
              {formatMinutesDuration(data.duration)}
            </Typography>
          </div>
          <div className={clsx(styles.cell, styles.flex25)}>
            <Typography className={styles.price} variant='body1'>
              {data.price} {data.currency}
            </Typography>
          </div>
          <div className={clsx(styles.cell, styles.fit)}>
            {!isOwn && deviceType === 'mobile' ? (
              <Icon
                className={styles.chevron}
                name='chevron-right'
                width={18}
                height={18}
              />
            ) : (
              <div className={styles.btnRoot}>
                <Accordion.Trigger className={styles.AccordionTrigger}>
                  {data.description && data.description.length > 1 ? (
                    <Button
                      variant='unstyled'
                      icon='info'
                      className='!text-gray hover:!text-primary '
                    />
                  ) : (
                    <div className='w-[40px]' />
                  )}
                </Accordion.Trigger>

                <CreateBooking
                  professional={professional}
                  selectedService={data.id}
                  btnVariant='outlined'
                />
              </div>
            )}
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Content className={styles.AccordionContent}>
        <div className={styles.contentContainer}>
          <EditorComponent readOnly value={data.description} id={data.id} />
          <Accordion.Trigger asChild className={styles.AccordionTrigger}>
            <Button
              icon='close'
              variant='unstyled'
              className={styles.closeBtn}
            />
          </Accordion.Trigger>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
};
