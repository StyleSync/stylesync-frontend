'use client';
import { type FC, useCallback, useMemo, useRef } from 'react';
// containers
import { ProfessionalQuizletWizardStepAbout } from '@/modules/user/containers/professional-quizlet-wizard-step-about';
import { ProfessionalQuizletWizardStepServices } from '@/modules/user/containers/professional-quizlet-wizard-step-services';
import { ProfessionalQuizletWizardStepSchedule } from '@/modules/user/containers/professional-quizlet-wizard-step-schedule';
import { ProfessionalQuizletWizardStepGallery } from '@/modules/user/containers/professional-quizlet-wizard-step-gallery';
import { ProfessionalQuizletWizardStepLocation } from '@/modules/user/containers/professional-quizlet-wizard-step-location';
// components
import { Header } from '@/modules/core/components/header';
import { Stepper } from '@/modules/core/components/stepper';
import { Progress } from '@/modules/core/components/progress';
// hooks
import { useQueryParams } from '@/modules/core/hooks/use-search-params';
// utils
import { percentOf } from '@/modules/core/utils/math.utils';

import type { ProfessionalQuizletWizardData } from './professional-quizlet-wizard.interface';
import styles from './professional-quizlet-wizard.module.scss';

const steps = ['about', 'services', 'schedule', 'gallery', 'location'] as const;
const initialStep: StepKey = 'about';

type StepKey = (typeof steps)[number];

export const ProfessionalQuizletWizard: FC = () => {
  const { queryParams, setQueryParams } = useQueryParams<{ step: StepKey }>();
  // refs
  const rootRef = useRef<HTMLDivElement>(null);
  // memo
  const activeStep = queryParams.step ?? initialStep;
  const wizardData = useMemo<ProfessionalQuizletWizardData<StepKey>>(
    () => ({
      about: {
        value: 'about',
        title: 'About',
        description:
          'We will use this information to create a detailed account of your experience that can be shared with your clients',
        Step: ProfessionalQuizletWizardStepAbout,
      },
      services: {
        value: 'services',
        title: 'Services',
        description: 'Complete your portfolio to attract more clients',
        Step: ProfessionalQuizletWizardStepServices,
      },
      schedule: {
        value: 'schedule',
        title: 'Schedule',
        description: 'test',
        Step: ProfessionalQuizletWizardStepSchedule,
      },
      gallery: {
        value: 'gallery',
        title: 'Gallery',
        description: 'test',
        Step: ProfessionalQuizletWizardStepGallery,
      },
      location: {
        value: 'location',
        title: 'Location',
        description: 'test',
        Step: ProfessionalQuizletWizardStepLocation,
      },
    }),
    []
  );
  const progress = useMemo(() => {
    const currentIndex = steps.findIndex((step) => step === activeStep);

    return percentOf(steps.length, currentIndex);
  }, [activeStep]);

  const next = useCallback(() => {
    const currentIndex = steps.findIndex((step) => step === activeStep);
    const nextStep: StepKey = steps[currentIndex + 1];

    setQueryParams({ step: nextStep });
  }, [activeStep, setQueryParams]);

  const back = useCallback(() => {
    const currentIndex = steps.findIndex((step) => step === activeStep);
    const prevStep: StepKey = steps[currentIndex - 1];

    setQueryParams({ step: prevStep });
  }, [activeStep, setQueryParams]);

  const { Step } = wizardData[activeStep as StepKey];

  return (
    <div className={styles.root} ref={rootRef}>
      <Stepper
        value={activeStep}
        steps={Object.values(wizardData).map((data) => ({
          value: data.value,
          text: data.title,
        }))}
        classes={{
          root: styles.stepper,
          line: styles.line,
          step: styles.stepp,
          stepText: styles.title,
        }}
      />
      <Header.BottomContent>
        <div className={styles.mobileProgress}>
          <Progress progress={progress} />
        </div>
      </Header.BottomContent>
      <div className={styles.steps}>
        <Step next={next} back={back} />
      </div>
    </div>
  );
};
