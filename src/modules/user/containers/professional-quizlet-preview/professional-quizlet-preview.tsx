import { type FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
// components
import { BrowserView } from '@/modules/core/components/browser-view';
import { Typography } from '@/modules/core/components/typogrpahy';
// assets
import AboutProPreview from '@/assets/images/about-pro-preview.png';

import type { ProfessionalQuizletPreviewProps } from './professional-quizlet-preview.interface';
import styles from './professional-quizlet-preview.module.scss';

export const ProfessionalQuizletPreview: FC<
  ProfessionalQuizletPreviewProps
> = () => {
  return (
    <div className={styles.root}>
      <Typography className={styles.description}>
        We will use this information to create a detailed account of your
        experience that can be shared with your clients
      </Typography>
      <BrowserView className={styles.browser} image={AboutProPreview} />
      <Link href='/app/profile' className={clsx(styles.skipLink, 'link')}>
        <Typography variant='body1'>Skip</Typography>
      </Link>
    </div>
  );
};
