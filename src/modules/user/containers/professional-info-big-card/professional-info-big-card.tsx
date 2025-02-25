'use client';
import { type FC, Suspense } from 'react';

import { trpc } from '@/modules/core/utils/trpc.utils';

import { ProData } from './elements/pro-data';
import { ProDataSkeleton } from './elements/pro-data-skeleton';
import { UserData } from './elements/user-data';
import type { ProfileInfoBigCardProps } from './professional-info-big-card.interface';

import styles from './professional-info-big-card.module.scss';

export const ProfessionalInfoBigCard: FC<ProfileInfoBigCardProps> = ({
  userId,
  session,
}) => {
  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: ['user'],
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <UserData professional={professional} />
      </div>
      <Suspense fallback={<ProDataSkeleton />}>
        <ProData professional={professional} session={session} />
      </Suspense>
    </div>
  );
};
