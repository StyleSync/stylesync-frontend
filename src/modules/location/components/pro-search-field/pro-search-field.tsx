'use client';
import {
  type FC,
  type ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
// components
import { Icon } from '@/modules/core/components/icon';
import { Button } from '@/modules/core/components/button';

import type { ProSearchFieldProps } from './pro-search-field.interface';
import { Popover } from '@/modules/core/components/popover';
import { TextField } from '@/modules/core/components/text-field';
import { useBoolean } from 'usehooks-ts';
import { useGeocodingSuggestionsQuery } from '@/modules/location/hooks/use-geocoding-suggestions-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ProfessionalSearchContext } from '@/modules/user/providers/professional-search-provider';
import { useIntl } from 'react-intl';

export const ProSearchField: FC<ProSearchFieldProps> = () => {
  const intl = useIntl();
  const router = useRouter();
  // context
  const { place, searchQuery, onSearchQueryChange, onPlaceChange } = useContext(
    ProfessionalSearchContext
  );
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
  }, [isCitySearchOpen.value]);

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSearchQueryChange(e.target.value);
    },
    [onSearchQueryChange]
  );

  return (
    <div className='w-fit focus-within:border-primary focus-within:bg-white bg-white/50 border-gray lg:border-gray-light transition border h-[40px] rounded-3xl items-center flex'>
      <div className='flex items-center min-w-[50px] md:min-w-[250px]'>
        <input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={intl.formatMessage({
            id: 'header.proSearch.placeholder',
          })}
          className='text-base placeholder:text-sm md:text-sm outline-none pl-6 pr-2 bg-transparent w-full'
        />
      </div>
      <div className='h-[18px] w-[1px] bg-gray-light' />
      <Popover
        isOpen={isCitySearchOpen.value}
        onClose={isCitySearchOpen.setFalse}
        trigger={
          <div
            className='flex items-center pl-6 pr-8 cursor-pointer text-dark hover:text-black min-w-[50px] md:min-w-[250px] transition'
            onClick={isCitySearchOpen.toggle}
          >
            <Icon
              name='location'
              width={16}
              height={16}
              className='text-inherit shrink-0'
            />
            <span className='text-sm text-inherit ml-3 mr-2 truncate flex-1'>
              {place?.properties.full_address ||
                intl.formatMessage({
                  id: 'header.proSearch.selectYourCity',
                })}
            </span>
            <Icon
              name='chevron-bottom'
              width={14}
              height={14}
              className={clsx('text-inherit transition shrink-0', {
                'rotate-180': isCitySearchOpen.value,
              })}
            />
          </div>
        }
        sideOffset={10}
        align='start'
        backgroundBlurEffect={false}
      >
        <div className='w-[300px] p-2 flex flex-col gap-y-4'>
          <TextField
            variant='input'
            className='!h-[40px] !text-sm !px-6 flex-1'
            placeholder={intl.formatMessage({
              id: 'header.proSearch.findYourCity',
            })}
            value={citySearchQuery}
            onChange={(e) => {
              setCitySearchQuery(e.target.value);
            }}
          />
          {placeSuggestions.data && (
            <div className='flex flex-col w-full gap-y-2'>
              {placeSuggestions.data?.features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => {
                    onPlaceChange(feature);
                    isCitySearchOpen.setFalse();
                  }}
                  className='flex items-center bg-transparent text-left text-sm py-3 transition rounded-md px-4 gap-y-2 hover:bg-primary-light hover:text-primary'
                >
                  {feature.properties.full_address}
                </button>
              ))}
            </div>
          )}
        </div>
      </Popover>

      <Button
        icon='search'
        variant='secondary'
        className='!w-8 !h-8 mr-1 shrink-0'
        classes={{
          icon: '!w-4 !h-4',
        }}
        onClick={() => {
          router.push('/app/search-pro');
        }}
      />
    </div>
  );
};
