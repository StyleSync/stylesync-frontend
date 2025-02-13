import React, { type FC, useContext } from 'react';
import clsx from 'clsx';
import * as Accordion from '@radix-ui/react-accordion';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
import { EditorPreview } from '@/modules/core/components/editor-preview';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// utils
import { formatDuration } from '@/modules/core/utils/time.utils';

import type { ServiceOnProfessionalTableRowProps } from './service-on-professional-table-row.interface';
import styles from './service-on-professional-table-row.module.scss';
import { isEditorFieldEmpty } from '@/modules/core/components/editor-field/editor-field';
import { useIntl } from 'react-intl';
import { BookingContext } from '@/modules/booking/providers/booking-provider';
import { Icon } from '@/modules/core/components/icon';

export const ServiceOnProfessionalTableRow: FC<
  ServiceOnProfessionalTableRowProps
> = ({ data, isOwn }) => {
  const intl = useIntl();
  const deviceType = useDeviceType();
  const { book } = useContext(BookingContext);

  return (
    <Accordion.Item className={styles.acardionItem} value={data.id}>
      <Accordion.Header>
        <div
          onClick={() => {
            if (deviceType === 'mobile' && !isOwn) {
              book(data);
            }
          }}
          className={styles.root}
        >
          <div className={clsx(styles.cell, styles.vertical, styles.flex75)}>
            <Typography className={styles.title} variant='body1'>
              {data.title}
            </Typography>
            <Typography className={styles.duration} variant='small'>
              {formatDuration(data.duration, intl)}
            </Typography>
          </div>
          <div className={clsx(styles.cell, styles.flex25)}>
            <Typography className={styles.price} variant='body1'>
              {data.price} {data.currency}
            </Typography>
          </div>
          <div className={clsx(styles.cell, styles.fit)}>
            {!isOwn && deviceType === 'mobile' ? (
              <div className={styles.btnRoot}>
                <Accordion.Trigger asChild>
                  {data.description && !isEditorFieldEmpty(data.description) ? (
                    <Button
                      variant='unstyled'
                      icon='info'
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className='text-gray hover:!text-primary data-[state=open]:text-primary'
                    />
                  ) : (
                    <div className='w-[40px]' />
                  )}
                </Accordion.Trigger>

                {!isOwn && (
                  <Icon
                    width={20}
                    height={20}
                    className={styles.chevron}
                    name='chevron-right'
                  />
                )}
              </div>
            ) : (
              <div className={styles.btnRoot}>
                <Accordion.Trigger asChild>
                  {data.description && !isEditorFieldEmpty(data.description) ? (
                    <Button
                      aria-label='Information'
                      variant='unstyled'
                      icon='info'
                      className='text-gray hover:!text-primary data-[state=open]:text-primary'
                    />
                  ) : (
                    <div
                      className='w-[40px]'
                      role='button'
                      aria-label='Information'
                    />
                  )}
                </Accordion.Trigger>

                {!isOwn && (
                  <Button
                    variant='outlined'
                    text={intl.formatMessage({
                      id: 'button.book',
                    })}
                    onClick={() => {
                      book(data);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Content className={styles.AccordionContent}>
        <div className='flex flex-col pb-6 pt-2'>
          <EditorPreview value={data.description} />
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
};
