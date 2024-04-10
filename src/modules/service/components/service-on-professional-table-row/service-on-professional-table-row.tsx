'use-client';
import Image from 'next/image';
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

import girl from '@/assets/images/girl.png';

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
    <Accordion.Root collapsible type='single'>
      <Accordion.Item className={styles.acardionItem} value='item-1'>
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
                    <Button text='info' variant='primary' />
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
            <Typography className={styles.price} variant='title'>
              Опис сервісу
            </Typography>
            <Typography>
              Я пропоную професійне фарбування волосся. Використовую барвники
              таких відомих і популярних брендів, як: Kydra,
              <br /> L’oreal,
              <br /> Lebel Materia,
              <br /> Davines,
              <br /> Wella,
              <br /> Guy Tang Mydentity.
            </Typography>
            <div className={styles.photos}>
              <Image width={150} height={150} alt='photo' src={girl} />
              <Image width={150} height={150} alt='photo' src={girl} />
              <Image width={150} height={150} alt='photo' src={girl} />
              <Image width={150} height={150} alt='photo' src={girl} />
              <Image width={150} height={150} alt='photo' src={girl} />
            </div>
            <Typography variant='body1'>
              Більше моїх робіт можна побачити в галереї
            </Typography>
            <div>
              <Typography variant='subtitle'>Я можу:</Typography>

              <Typography>
                <br />
                <br />
                <strong>Омбре</strong> – фарбування з плавним переходом тону від
                коренів до кінчиків (від натурального до будь-якого бажаного).
                <br />
                <strong> Балаяж</strong>
                – одна з технік фарбування волосся, що створює враження
                «вигорілих на сонці пасм».
                <br />
                <strong>Класичне мелірування</strong>
                – техніка з використанням фольги, цей варіант дає унікальну
                можливість досягти максимально можливого освітлення.
                <br />
                <strong>Омбре</strong>
                – фарбування з плавним переходом тону від коренів до кінчиків
                (від натурального до будь-якого бажаного).
                <br />
                <strong>Тонування волосся</strong>
                – Тонуючі барвники містять комплекси, що обволікають кожну
                волосину, і надають волоссю екстра-сяйво. Після такого
                фарбування волосся стає дуже м’якими, блискучим і пружним.
                <br />
                <strong>Ейр-тач</strong>
                – «Дотик повітря» – так дослівно перекладається назва цієї
                технології фарбування.В процесі такого фарбування
                використовується фен. Локони природно розпадаються на пасма
                потоком повітря з фена. Таким чином стилісту вдається відтворити
                відчуття легкого дотику кольору до локонів і найтонші барвисті
                переливи, котрі надають зачісці неповторний шик.
                <br />
              </Typography>
            </div>

            <Accordion.Trigger asChild className={styles.AccordionTrigger}>
              <Button
                text='CLOSE'
                variant='unstyled'
                className={styles.closeBtn}
              />
            </Accordion.Trigger>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
