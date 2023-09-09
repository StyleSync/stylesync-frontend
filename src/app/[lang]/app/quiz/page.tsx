// containers
import { ProfessionalQuizletWizard } from '@/modules/user/containers/professional-quizlet-wizard';
import { ProfessionalQuizletPreview } from '@/modules/user/containers/professional-quizlet-preview';

import styles from './quiz.module.scss';

export default async function Home() {
  return (
    <div className={styles.root}>
      <ProfessionalQuizletWizard />
      <ProfessionalQuizletPreview />
    </div>
  );
}
