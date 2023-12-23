'use client';
import { type FC } from 'react';

import type { ProLocationProps } from './pro-location.interface';
import styles from './pro-location.module.scss';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Map } from '@/modules/location/components/map';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { Placeholder } from '@/modules/core/components/placeholder';
import clsx from 'clsx';

export const ProLocation: FC<ProLocationProps> = ({ userId }) => {
  // queries
  const { data: professional, ...professionalQuery } =
    trpc.professional.get.useQuery({
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
        retry: (retryCount, error) => {
          if (error.data?.code === 'NOT_FOUND') return false;

          return retryCount <= 2;
        },
      }
    );

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
          <Map
            markers={
              location
                ? [{ lat: location.latitude, lng: location.longitude }]
                : []
            }
            center={
              location
                ? { lat: location.latitude, lng: location.longitude }
                : undefined
            }
            zoom={location ? 17 : undefined}
          />
        </div>
      </Placeholder>
    </div>
  );
};
