import { useCallback, useMemo } from 'react';
// containers
import { OnboardAbout } from '@/modules/onboard/containers/onboard-about';
import { OnboardServices } from '@/modules/onboard/containers/onboard-services';
import { OnboardSchedule } from '@/modules/onboard/containers/onboard-schedule';
import { OnboardGallery } from '@/modules/onboard/containers/onboard-gallery';
import { OnboardLocation } from '@/modules/onboard/containers/onboard-location';
// hooks
import { useQueryParams } from '@/modules/core/hooks/use-search-params';
// utils
import { percentOf } from '@/modules/core/utils/math.utils';
// types
import type { ProOnboardData } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';

const steps = ['about', 'services', 'schedule', 'gallery', 'location'] as const;
const initialStep: StepKey = 'about';

type StepKey = (typeof steps)[number];

export const useOnboard = () => {
  const { queryParams, setQueryParams } = useQueryParams<{ step: StepKey }>();
  const active = queryParams.step ?? initialStep;
  // memo
  const onboardData = useMemo<ProOnboardData<StepKey>>(
    () => ({
      about: {
        value: 'about',
        title: 'About',
        description:
          'We will use this information to create a detailed account of your experience that can be shared with your clients',
        Step: OnboardAbout,
      },
      services: {
        value: 'services',
        title: 'Services',
        description: 'Complete your portfolio to attract more clients',
        Step: OnboardServices,
      },
      schedule: {
        value: 'schedule',
        title: 'Schedule',
        description: 'test',
        Step: OnboardSchedule,
      },
      gallery: {
        value: 'gallery',
        title: 'Gallery',
        description: 'test',
        Step: OnboardGallery,
      },
      location: {
        value: 'location',
        title: 'Location',
        description: 'test',
        Step: OnboardLocation,
      },
    }),
    []
  );
  const progress = useMemo(() => {
    const currentIndex = steps.findIndex((step) => step === active);

    return percentOf(steps.length, currentIndex);
  }, [active]);

  const next = useCallback(() => {
    const currentIndex = steps.findIndex((step) => step === active);
    const nextStep: StepKey = steps[currentIndex + 1];

    setQueryParams({ step: nextStep });
  }, [active, setQueryParams]);

  const back = useCallback(() => {
    const currentIndex = steps.findIndex((step) => step === active);
    const prevStep: StepKey = steps[currentIndex - 1];

    setQueryParams({ step: prevStep });
  }, [active, setQueryParams]);

  const { Step } = onboardData[active];

  return { active, Step, next, back, progress, onboardData };
};
