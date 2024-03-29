'use client';
import { type FC } from 'react';
import clsx from 'clsx';
// components
import { Placeholder } from '@/modules/core/components/placeholder';
import { Typography } from '@/modules/core/components/typogrpahy';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { onQueryRetry } from '@/modules/core/utils/query-retry.utils';

// type
import type { ProLocationProps } from './pro-location.interface';
import styles from './pro-location.module.scss';
import dynamic from 'next/dynamic';

const Map = dynamic(
  () => import('@/modules/location/components/map').then((res) => res.Map),
  {
    ssr: false,
  }
);

export const ProLocation: FC<ProLocationProps> = ({ userId }) => {
  // queries
  const { data: professional } = trpc.professional.get.useQuery({
    id: userId,
    expand: ['user'],
  });
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

  const zoomNum = 17;
  const markers = location && [
    { lat: location.latitude, lng: location.longitude },
  ];
  const center = location && {
    lat: location.latitude,
    lng: location.longitude,
  };
  const zoom = location && zoomNum;

  return (
    <div className={styles.root}>
      <Placeholder
        className={styles.root}
        isActive={locationQuery.isLoading}
        placeholder={
          <>
            <div className={clsx(styles.addressSkeleton, 'skeleton')} />
            <div className={clsx(styles.mapContainerSkeleton, 'skeleton')} />
          </>
        }
      >
        <Typography className={styles.address}>{location?.name}</Typography>
        <div className={styles.mapContainer}>
          <Map markers={markers} center={center} zoom={zoom} />
        </div>
      </Placeholder>
    </div>
  );
};
