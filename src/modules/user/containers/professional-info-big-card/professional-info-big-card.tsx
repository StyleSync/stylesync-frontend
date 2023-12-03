'use client';
import { useMemo, type FC } from 'react';

import Link from 'next/link';
import { faker } from '@faker-js/faker';
import clsx from 'clsx';
import { useBoolean } from 'usehooks-ts';
import type { Service } from '@prisma/client';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
import { Avatar } from '@/modules/core/components/avatar';
import { ServiceTag } from '@/modules/service/components/service-tag';
import { Emoji } from '@/modules/core/components/emoji';
import { Placeholder } from '@/modules/core/components/placeholder';
import { UserContactPopup } from '@/modules/user/components/user-contact-popup';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { getFullName } from '@/modules/user/utils/user.utils';

import type { ProfileInfoBigCardProps } from './professional-info-big-card.interface';
import styles from './professional-info-big-card.module.scss';

export const ProfessionalInfoBigCard: FC<ProfileInfoBigCardProps> = ({
  userId,
}) => {
  // queries
  const { data: professional, ...professionalQuery } =
    trpc.professional.get.useQuery({
      id: userId,
      expand: ['user'],
    });
  const { data: serviceOnProfessionalList, ...serviceOnProfessionalListQuery } =
    trpc.serviceOnProfessional.list.useQuery(
      {
        professionalId: professional?.id,
      },
      {
        enabled: Boolean(professional),
      }
    );
  // state
  const isContactOpen = useBoolean();
  // memo
  const services = useMemo(() => {
    return (
      serviceOnProfessionalList?.reduce<Service[]>(
        (res, serviceOnProfessional) => {
          if (
            res.find((item) => item.id === serviceOnProfessional.service.id)
          ) {
            return res;
          }

          return [serviceOnProfessional.service, ...res];
        },
        []
      ) ?? []
    );
  }, [serviceOnProfessionalList]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Placeholder
          className={clsx('skeleton', styles.avatarSkeleton)}
          isActive={professionalQuery.isLoading}
          placeholder={null}
        >
          <Avatar
            className={styles.avatar}
            size='medium'
            shadow
            shape='rect'
            fallback={<Emoji name='sunglasses' width={50} height={50} />}
            url={professional?.user?.avatar}
          />
        </Placeholder>
        <Placeholder
          className={clsx('skeleton', styles.nameSkeleton)}
          isActive={professionalQuery.isLoading}
          placeholder={null}
        >
          <Typography className={styles.name} variant='title'>
            {getFullName(professional?.user ?? {})}
          </Typography>
        </Placeholder>
      </div>
      <div className={styles.info}>
        <div className={styles.general}>
          <div className={styles.services}>
            <Placeholder
              className={styles.servicesSkeleton}
              isActive={serviceOnProfessionalListQuery.isLoading}
              placeholder={
                <>
                  <div className='skeleton' />
                  <div className='skeleton' />
                  <div className='skeleton' />
                </>
              }
            >
              <Placeholder
                className={styles.emptyPlaceholder}
                isActive={services.length === 0}
                placeholder={
                  <>
                    <Icon name='beauty-service' />
                    <Typography>No services provided</Typography>
                  </>
                }
              >
                {services.map((service) => (
                  <ServiceTag
                    key={service.id}
                    className={styles.service}
                    data={service}
                  />
                ))}
              </Placeholder>
            </Placeholder>
          </div>
          <div className={styles.location}>
            <Placeholder
              className={clsx('skeleton', styles.locationSkeleton)}
              isActive={professionalQuery.isLoading}
              placeholder={null}
            >
              <Icon name='location' />
              <Typography>
                {faker.location.streetAddress({ useFullAddress: true })}
              </Typography>
              <Typography>
                <Link href='#' className={clsx('link', styles.showOnMapLink)}>
                  Show on map
                </Link>
              </Typography>
            </Placeholder>
          </div>
        </div>
        <div className={styles.actions}>
          <UserContactPopup
            isOpen={isContactOpen.value}
            onClose={isContactOpen.setFalse}
            trigger={
              <Button
                variant='secondary'
                text='Contact'
                onClick={isContactOpen.setTrue}
                disabled={professionalQuery.isLoading}
              />
            }
          />
          <Button
            variant='primary'
            text='Book'
            disabled={professionalQuery.isLoading}
          />
        </div>
      </div>
    </div>
  );
};
