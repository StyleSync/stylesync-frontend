'use client';
import {
  type ChangeEvent,
  type FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import { Button } from '@/modules/core/components/button';
// components
import { Icon } from '@/modules/core/components/icon';
import { Popover } from '@/modules/core/components/popover';
import { TextField } from '@/modules/core/components/text-field';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { useGeocodingSuggestionsQuery } from '@/modules/location/hooks/use-geocoding-suggestions-query';
import { ProfessionalSearchContext } from '@/modules/user/providers/professional-search-provider';

import type { ProSearchFieldProps } from './pro-search-field.interface';

export const ProSearchField: FC<ProSearchFieldProps> = () => {
  const intl = useIntl();
  const router = useRouter();
  const deviceType = useDeviceType();
  // context
  const {
    place,
    searchQuery,
    onSearchQueryChange,
    onPlaceChange,
    activateBrowserLocationSearch,
  } = useContext(ProfessionalSearchContext);
  // state
  const isCitySearchOpen = useBoolean();
  const [citySearchQuery, setCitySearchQuery] = useState('');
  // queries
  const placeSuggestions = useGeocodingSuggestionsQuery(citySearchQuery, {
    types: 'place',
  });

  useEffect(() => {
    if (!isCitySearchOpen.value) {
      setCitySearchQuery('');
    }

    if (isCitySearchOpen.value) {
      activateBrowserLocationSearch();
    }
  }, [isCitySearchOpen.value, activateBrowserLocationSearch]);

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSearchQueryChange(e.target.value);
    },
    [onSearchQueryChange]
  );

  return (
    <Popover
      isOpen={isCitySearchOpen.value}
      onClose={isCitySearchOpen.setFalse}
      trigger={
        <div className='flex h-[60px] w-fit items-center rounded-2xl border border-white bg-white/60 shadow transition focus-within:border-black focus-within:bg-white md:h-[40px] lg:border-gray-light'>
          <div className='flex min-w-[50px] items-center md:min-w-[250px]'>
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={intl.formatMessage({
                id: 'header.proSearch.placeholder',
              })}
              className='w-full bg-transparent pl-6 pr-2 text-base outline-none placeholder:text-sm placeholder:text-gray-accent md:text-sm'
            />
          </div>
          <div className='h-[18px] w-[1px] bg-gray-light' />
          <div
            className='flex min-w-[50px] max-w-[200px] cursor-pointer items-center pl-2 pr-4 text-dark transition hover:text-black md:min-w-[250px] md:pl-6 md:pr-8'
            onClick={isCitySearchOpen.toggle}
          >
            <Icon
              name='location'
              width={16}
              height={16}
              className='shrink-0 text-inherit'
            />
            <span className='ml-3 mr-2 flex-1 truncate text-sm text-inherit'>
              {place?.properties.full_address ||
                intl.formatMessage({
                  id: 'header.proSearch.selectYourCity',
                })}
            </span>
            <Icon
              name='chevron-bottom'
              width={14}
              height={14}
              className={clsx('shrink-0 text-inherit transition', {
                'rotate-180': isCitySearchOpen.value,
              })}
            />
          </div>

          <Button
            aria-label='Search'
            icon='search'
            variant={deviceType === 'mobile' ? 'light' : 'secondary'}
            className='mr-2 !h-10 !w-10 shrink-0 !rounded-[12px] md:mr-1 md:!h-8 md:!w-8'
            classes={{
              icon: '!w-4 !h-4',
            }}
            onClick={() => {
              router.push('/app/search-pro');
            }}
            type='button'
          />
        </div>
      }
      align={deviceType === 'mobile' ? 'center' : 'end'}
      backgroundBlurEffect={false}
      sideOffset={5}
    >
      <div
        className='flex w-[300px] flex-col gap-y-4 p-2'
        style={{
          width:
            // eslint-disable-next-line no-magic-numbers
            deviceType === 'mobile' ? document.body.clientWidth - 64 : '300px',
        }}
      >
        <TextField
          variant='input'
          className='!h-[40px] flex-1 !px-6 !text-sm'
          placeholder={intl.formatMessage({
            id: 'header.proSearch.findYourCity',
          })}
          value={citySearchQuery}
          onChange={(e) => {
            setCitySearchQuery(e.target.value);
          }}
        />
        {placeSuggestions.data && (
          <div className='flex w-full flex-col gap-y-2'>
            {placeSuggestions.data?.features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => {
                  onPlaceChange(feature);
                  isCitySearchOpen.setFalse();
                }}
                className='flex items-center gap-y-2 rounded-md bg-transparent px-4 py-3 text-left text-sm transition hover:bg-primary-light hover:text-primary'
              >
                {feature.properties.full_address}
              </button>
            ))}
          </div>
        )}
      </div>
    </Popover>
  );
};
