import { pageGuard } from '@/modules/core/utils/route.utils';
import { OnboardTitle } from '@/modules/onboard/containers/onboard-title';
import { ProOnboard } from '@/modules/onboard/containers/pro-onboard';

import styles from './onboard.module.scss';

export default async function Onboard() {
  await pageGuard({
    require: {
      onboarding: false,
      userType: true,
    },
  });

  return (
    <div className={styles.root}>
      <OnboardTitle />
      <ProOnboard />
    </div>
  );
}
