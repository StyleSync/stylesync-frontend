'use client';
import { type FC, useRef, useState } from 'react';
import { useIntersectionObserver, useUpdateEffect } from 'usehooks-ts';
// components
import { Tabs } from '@/modules/core/components/tabs';
// types
import type { Tab } from '@/modules/core/components/tabs/tabs.interface';
// constants
import scssVariables from '@/styles/variables.module.scss';

const tabs: Tab[] = [
  {
    key: 'about',
    name: 'About',
  },
  {
    key: 'services',
    name: 'Services',
  },
  {
    key: 'gallery',
    name: 'Gallery',
  },
];

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

  return <Tabs ref={tabsRef} value={value} tabs={tabs} onChange={setValue} />;
};
