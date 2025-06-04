import { useCallback, useMemo } from 'react';

import { useIntl } from 'react-intl';

import { useQueryParams } from '@/modules/core/hooks/use-search-params';
import { percentOf } from '@/modules/core/utils/math.utils';
import { OnboardAbout } from '@/modules/onboard/containers/onboard-about';
import { OnboardGallery } from '@/modules/onboard/containers/onboard-gallery';
import { OnboardLocation } from '@/modules/onboard/containers/onboard-location';
import { OnboardSchedule } from '@/modules/onboard/containers/onboard-schedule';
import { OnboardServices } from '@/modules/onboard/containers/onboard-services';
import type { ProOnboardData } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';

const steps = ['about', 'services', 'schedule', 'gallery', 'location'] as const;
const initialStep: StepKey = 'about';

type StepKey = (typeof steps)[number];

export const useOnboard = () => {
  const { queryParams, setQueryParams } = useQueryParams<{ step: StepKey }>();
  const active = queryParams.step ?? initialStep;

  const intl = useIntl();
  // memo
  const onboardData = useMemo<ProOnboardData<StepKey>>(
    () => ({
      about: {
        value: 'about',
        title: intl.formatMessage({ id: 'onboard.data.about' }),
        description: intl.formatMessage({
          id: 'onboard.data.description.about',
        }),
        Step: OnboardAbout,
        allowSkip: false,
      },
      services: {
        value: 'services',
        title: intl.formatMessage({ id: 'onboard.data.services' }),
        description: intl.formatMessage({
          id: 'onboard.data.description.services',
        }),
        Step: OnboardServices,
        allowSkip: true,
      },
      schedule: {
        value: 'schedule',
        title: intl.formatMessage({ id: 'onboard.data.schedule' }),
        description: 'test',
        Step: OnboardSchedule,
        allowSkip: true,
      },
      gallery: {
        value: 'gallery',
        title: intl.formatMessage({ id: 'onboard.data.gallery' }),
        description: 'test',
        Step: OnboardGallery,
        allowSkip: true,
      },
      location: {
        value: 'location',
        title: intl.formatMessage({ id: 'onboard.data.location' }),
        description: 'test',
        Step: OnboardLocation,
        allowSkip: true,
      },
    }),
    [intl]
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
