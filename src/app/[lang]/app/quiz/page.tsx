// containers
import { ProfessionalQuizletWizard } from '@/modules/user/containers/professional-quizlet-wizard';
import { ProfessionalQuizletPreview } from '@/modules/user/containers/professional-quizlet-preview';

import styles from './quiz.module.scss';
import { pageGuard } from '@/modules/core/utils/route.utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Quiz() {
  const session = await getServerSession(authOptions);

  pageGuard(session, {
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
