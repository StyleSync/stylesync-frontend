'use client';
import { useMemo, type FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useBoolean } from 'usehooks-ts';
import type { Service } from '@prisma/client';
import { useIntl } from 'react-intl';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
import { Icon, type IconName } from '@/modules/core/components/icon';
import { Avatar } from '@/modules/core/components/avatar';
import { Tag } from '@/modules/core/components/tag';
import { Placeholder } from '@/modules/core/components/placeholder';
import { UserContactPopup } from '@/modules/user/components/user-contact-popup';

// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { onQueryRetry } from '@/modules/core/utils/query-retry.utils';
import { getFullName } from '@/modules/user/utils/user.utils';

import type { ProfileInfoBigCardProps } from './professional-info-big-card.interface';
import styles from './professional-info-big-card.module.scss';
import { CreateBooking } from '@/modules/booking/containers/create-booking-container/create-booking';

export const ProfessionalInfoBigCard: FC<ProfileInfoBigCardProps> = ({
  userId,
}) => {
  const intl = useIntl();
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
  const { data: location, ...locationQuery } =
    trpc.location.getByProfessionalId.useQuery(
      {
        id: professional?.id ?? '',
      },
      {
        enabled: Boolean(professional),
        retry: (retryCount, error) => onQueryRetry(retryCount, error),
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
          isActive={professionalQuery.isLoading && !professionalQuery.isError}
          placeholder={null}
        >
          <Avatar
            className={styles.avatar}
            url={professional?.user?.avatar}
            size='medium'
            shape='circle'
            shadow
          />
        </Placeholder>
        <Placeholder
          className={clsx('skeleton', styles.nameSkeleton)}
          isActive={professionalQuery.isLoading}
          placeholder={null}
        >
          <div className={styles.titleContainer}>
            <Typography className={styles.name} variant='title' weight='medium'>
              {getFullName(professional?.user ?? {})}
            </Typography>
            <div className={styles.proBadge}>
              <Typography variant='small' weight='medium'>
                STYLE PRO
              </Typography>
            </div>
          </div>
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
                  <Tag
                    key={service.id}
                    className={styles.service}
                    icon={service.icon as IconName}
                    text={intl.formatMessage({ id: service.name })}
                  />
                ))}
              </Placeholder>
            </Placeholder>
          </div>
          <div className={styles.location}>
            <Placeholder
              className={clsx('skeleton', styles.locationSkeleton)}
              isActive={locationQuery.isLoading}
              placeholder={null}
            >
              <Icon name='location' />
              <Typography className={styles.name}>
                {location?.name || 'No location'}
              </Typography>
              {location && (
                <Typography>
                  <Link href='#' className={clsx('link', styles.showOnMapLink)}>
                    Show on map
                  </Link>
                </Typography>
              )}
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
          <CreateBooking isLoadingTrigger={professionalQuery.isLoading} />
        </div>
      </div>
    </div>
  );
};
