import {
  type ChangeEvent,
  type FC,
  useCallback,
  useEffect,
  useState,
} from 'react';

import type { GeocodingFeature } from '@mapbox/search-js-core';
import { useBoolean, useDebounceValue } from 'usehooks-ts';

import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import type { DropdownItem } from '@/modules/core/components/dropdown-menu/dropdown-menu.interface';
import { TextField } from '@/modules/core/components/text-field';
import { useGeocodingSuggestionsQuery } from '@/modules/location/hooks/use-geocoding-suggestions-query';

import type { LocationSearchProps } from './location-search.interface';

const SEARCH_DEBOUNCE_DELAY = 200;

export const LocationSearch: FC<LocationSearchProps> = ({
  value,
  onChange,
  inputProps,
}) => {
  // state
  const isActive = useBoolean();
  const [query, setQuery] = useState(value?.name ?? '');
  const [queryDebounced] = useDebounceValue(query, SEARCH_DEBOUNCE_DELAY);
  const addressSuggestions = useGeocodingSuggestionsQuery(queryDebounced, {
    types: 'address',
  });
  const suggestions = addressSuggestions.data?.features || [];

  useEffect(() => {
    if (!value) {
      setQuery('');

      return;
    }

    setQuery(value.name);
  }, [value]);

  const handleTextFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const handleTextFieldBlur = useCallback(() => {
    if (!query && value) {
      onChange(null);

      return;
    }

    if (value && value.name !== query) {
      setQuery(value.name);

      return;
    }
  }, [query, value, onChange]);

  const handleLocationSelect = useCallback(
    ({ data }: DropdownItem<GeocodingFeature>) => {
      if (!data) return;

      onChange({
        name: data.properties.full_address,
        lat: data.properties.coordinates.latitude,
        lng: data.properties.coordinates.longitude,
      });
      isActive.setFalse();
    },
    [isActive, onChange]
  );

  return (
    <DropdownMenu<GeocodingFeature>
      items={suggestions.map((address) => ({
        id: address.id,
        text: address.properties.full_address,
        data: address,
      }))}
      onSelect={handleLocationSelect}
      trigger={
        <div className='w-full'>
          <TextField
            variant='input'
            onFocus={isActive.setTrue}
            value={query}
            onChange={handleTextFieldChange}
            onBlur={handleTextFieldBlur}
            {...inputProps}
          />
        </div>
      }
      isOpen={isActive.value}
      onClose={isActive.setFalse}
      popoverProps={{
        forceTriggerWidth: true,
        disableAutofocus: true,
      }}
    />
  );
};
