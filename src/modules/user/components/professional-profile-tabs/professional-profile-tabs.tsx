'use client';
import { type FC, useRef, useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
// components
import { Tabs } from '@/modules/core/components/tabs';
// hooks
import { useIntersectionObserver, useUpdateEffect } from 'usehooks-ts';
// types
import type { Tab } from '@/modules/core/components/tabs/tabs.interface';
// constants
import scssVariables from '@/styles/variables.module.scss';

const scrollToProfileSection = (tabKey: string) => {
  const sectionElement = document.getElementById(`profile-${tabKey}`);

  if (!sectionElement) {
    return;
  }

  window.scrollTo({
    top:
      sectionElement.getBoundingClientRect().top +
      window.scrollY -
      scssVariables.headerHeight,
    behavior: 'smooth',
  });
};

export const ProfessionalProfileTabs: FC = () => {
  const intl = useIntl();
  // state
  const [value, setValue] = useState('about');
  // refs
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const skipNextScroll = useRef<boolean>(false);
  // observers
  const entry = useIntersectionObserver(tabsRef, {});

  const isVisible = !!entry?.isIntersecting;

  useUpdateEffect(() => {
    if (isVisible) {
      setValue((current) => {
        if (current !== 'about') {
          skipNextScroll.current = true;
        }

        return 'about';
      });
    }
  }, [isVisible]);

  useUpdateEffect(() => {
    if (!skipNextScroll.current) {
      scrollToProfileSection(value);
    }

    skipNextScroll.current = false;
  }, [value]);

  const tabs: Tab[] = useMemo(
    () => [
      {
        key: 'about',
        name: intl.formatMessage({
          id: 'user.professional.profile.tabs.about',
        }),
      },
      {
        key: 'services',
        name: intl.formatMessage({
          id: 'user.professional.profile.tabs.services',
        }),
      },
      {
        key: 'gallery',
        name: intl.formatMessage({
          id: 'user.professional.profile.tabs.gallery',
        }),
      },
    ],
    []
  );

  return <Tabs ref={tabsRef} value={value} tabs={tabs} onChange={setValue} />;
};
