'use client';
import { useMemo, type FC, Suspense } from 'react';

import clsx from 'clsx';
import { useBoolean } from 'usehooks-ts';
import type { Service, Prisma } from '@prisma/client';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
import { Avatar } from '@/modules/core/components/avatar';
import { Placeholder } from '@/modules/core/components/placeholder';
import { UserContactPopup } from '@/modules/user/components/user-contact-popup';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { getFullName } from '@/modules/user/utils/user.utils';
import type { ProfileInfoBigCardProps } from './professional-info-big-card.interface';
import styles from './professional-info-big-card.module.scss';
import { CreateBooking } from '@/modules/booking/containers/create-booking-container/create-booking';
import Link from 'next/link';
import { onQueryRetry } from '@/modules/core/utils/query-retry.utils';
import { ErrorBoundary } from 'react-error-boundary';

const GeneralInfo: FC<{
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
}> = ({ professional }) => {
  return (
    <div className={styles.generalInfo}>
      <Avatar
        className={styles.avatar}
        url={professional.user.avatar}
        size='medium'
        shape='circle'
        shadow
      />
      <div className={styles.titleContainer}>
        <Typography className={styles.name} variant='title' weight='medium'>
          {getFullName(professional.user)}
        </Typography>
        <div className={styles.proBadge}>
          <Typography variant='small' weight='medium'>
            STYLE PRO
          </Typography>
        </div>
      </div>
    </div>
  );
};

const GeneralInfoSkeleton: FC = () => {
  return (
    <div className={styles.generalInfo}>
      <div className={clsx(styles.avatarSkeleton, 'skeleton')} />
      <div className={styles.titleContainer}>
        <div className={clsx(styles.nameSkeleton, 'skeleton')} />
      </div>
    </div>
  );
};

const Location: FC<{ professionalId: string }> = ({ professionalId }) => {
  const [location] = trpc.location.getByProfessionalId.useSuspenseQuery(
    {
      id: professionalId,
    },
    {
      retry: (retryCount, error) => onQueryRetry(retryCount, error),
    }
  );

  return (
    <div className={styles.location}>
      <Icon name='location' />
      <Typography className={styles.name}>{location.name}</Typography>
      <Typography>
        <Link href='#' className={clsx('link', styles.showOnMapLink)}>
          Show on map
        </Link>
      </Typography>
    </div>
  );
};

const ProfessionalMetadata: FC<{
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
}> = ({ professional }) => {
  // queries
  const [serviceOnProfessionalList] =
    trpc.serviceOnProfessional.list.useSuspenseQuery({
      professionalId: professional.id,
    });
  // state
  const isContactOpen = useBoolean();
  // memo
  const services = useMemo(() => {
    return serviceOnProfessionalList.reduce<Service[]>(
      (res, serviceOnProfessional) => {
        const isExist = !!res.find(
          (item) => item.id === serviceOnProfessional.service.id
        );

        if (isExist) {
          return res;
        }

        return [serviceOnProfessional.service, ...res];
      },
      []
    );
  }, [serviceOnProfessionalList]);

  return (
    <div className={styles.info}>
      <div className={styles.general}>
        <Placeholder
          className={styles.emptyPlaceholder}
          isActive={services.length === 0}
          placeholder={
            <>
              <Icon name='info' width={24} height={24} />
              <Typography>No services provided</Typography>
            </>
          }
        >
          <div>
            {/* <div className={styles.services}> */}
            {/*   {services.map((service) => ( */}
            {/*     <Tag */}
            {/*       key={service.id} */}
            {/*       className={styles.service} */}
            {/*       icon={service.icon as IconName} */}
            {/*       text={intl.formatMessage({ id: service.name })} */}
            {/*     /> */}
            {/*   ))} */}
            {/* </div> */}
            {/* <Typography variant='body2' className={styles.newOnPlatform}> */}
            {/*   <Icon name='info' width={14} /> */}
            {/*   New on platform */}
            {/* </Typography> */}
          </div>
        </Placeholder>

        {services.length > 0 && (
          <ErrorBoundary fallback={<></>}>
            <Suspense
              fallback={
                <div className={clsx(styles.locationSkeleton, 'skeleton')} />
              }
            >
              <Location professionalId={professional.id} />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
      {services.length > 0 && (
        <div className={styles.actions}>
          <UserContactPopup
            isOpen={isContactOpen.value}
            onClose={isContactOpen.setFalse}
            trigger={
              <Button
                variant='secondary'
                text='Contact'
                onClick={isContactOpen.setTrue}
              />
            }
          />
          {/* <Button variant='primary' text='Book' /> */}
          <CreateBooking />
        </div>
      )}
    </div>
  );
};

const ProfessionalMetadataSkeleton: FC = () => {
  return (
    <div className={styles.info}>
      <div className={styles.general}>
        <div className={styles.services}>
          <div className={styles.servicesSkeleton}>
            <div className='skeleton' />
            <div className='skeleton' />
            <div className='skeleton' />
          </div>
        </div>
        <div className={clsx(styles.locationSkeleton, 'skeleton')} />
      </div>
    </div>
  );
};

export const ProfessionalInfoBigCard: FC<ProfileInfoBigCardProps> = ({
  userId,
}) => {
  // queries
  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: ['user'],
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Suspense fallback={<GeneralInfoSkeleton />}>
          <GeneralInfo professional={professional} />
        </Suspense>
      </div>
      <Suspense fallback={<ProfessionalMetadataSkeleton />}>
        <ProfessionalMetadata professional={professional} />
      </Suspense>
    </div>
  );
};
