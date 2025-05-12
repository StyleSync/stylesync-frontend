import { pageGuard } from '@/modules/core/utils/route.utils';
import { ExistingAccountTypeSelect } from '@/modules/user/containers/existing-account-type-select';

import styles from './account-type.module.scss';

export default async function AccountType() {
  await pageGuard({
    require: {
      userType: false,
      onboarding: false,
    },
  });

  return (
    <div className={styles.root}>
      <ExistingAccountTypeSelect />
    </div>
  );
}
