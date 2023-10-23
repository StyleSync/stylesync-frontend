// containers
import { ProfessionalQuizletWizard } from '@/modules/user/containers/professional-quizlet-wizard';
import { ProfessionalQuizletPreview } from '@/modules/user/containers/professional-quizlet-preview';
// utils
import { pageGuard } from '@/modules/core/utils/route.utils';

import styles from './quiz.module.scss';

export default async function Quiz() {
  await pageGuard({
    require: {
      userType: true,
      onboarding: false,
    },
  });

  return (
    <div className={styles.root}>
      <ProfessionalQuizletWizard />
      <ProfessionalQuizletPreview />
    </div>
  );
}
