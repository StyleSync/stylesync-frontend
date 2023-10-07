import {
  type FC,
  type ChangeEvent,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { useBoolean, useDebounce } from 'usehooks-ts';
import type { SearchResult } from 'leaflet-geosearch/lib/providers/provider';
import type { RawResult } from 'leaflet-geosearch/lib/providers/openStreetMapProvider';
// components
import {
  Icon,
  Placeholder,
  Popover,
  TextField,
  Typography,
} from '@/modules/core/components';
// hooks
import { useLocationSearchQuery } from '@/modules/location/hooks/use-location-search-query';

import type { LocationSearchProps } from './location-search.interface';
import styles from './location-search.module.scss';

const SEARCH_DEBOUNCE_DELAY = 200;
const MAX_ITEMS_SUGGESTED = 6;

export const LocationSearch: FC<LocationSearchProps> = ({
  value,
  onChange,
  inputProps,
}) => {
  // state
  const isActive = useBoolean();
  const [query, setQuery] = useState(value?.label ?? '');
  const queryDebounced = useDebounce(query, SEARCH_DEBOUNCE_DELAY);
  // queries
  const locationSearchQuery = useLocationSearchQuery(queryDebounced);
  // memo
  const locations =
    locationSearchQuery.data?.slice(0, MAX_ITEMS_SUGGESTED) ?? [];

  useEffect(() => {
    if (!value) {
      setQuery('');

      return;
    }

    setQuery(value.label);
  }, [value]);

  const handleTextFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const handleLocationSelect = useCallback(
    (data: SearchResult<RawResult>) => () => {
      onChange({
        label: data.label,
        lat: data.y,
        lng: data.x,
      });
      isActive.setFalse();
    },
    [isActive.setFalse, onChange]
  );

  return (
    <Popover
      isOpen={isActive.value}
      onClose={isActive.setFalse}
      trigger={
        <TextField
          variant='input'
          onFocus={isActive.setTrue}
          value={query}
          onChange={handleTextFieldChange}
          {...inputProps}
        />
      }
      followTriggerWidth
      disableAutofocus
    >
      <div className={styles.root}>
        <Placeholder
          isActive={locations.length === 0 && query.length === 0}
          placeholder={
            <div className={styles.placeholder}>
              <Icon name='info' />
              <Typography>Begin typing your location</Typography>
            </div>
          }
        >
          <Placeholder
            isActive={locations.length === 0 && query.length > 0}
            placeholder={
              <div className={styles.placeholder}>
                <Icon name='info' />
                <Typography>Location was not found</Typography>
              </div>
            }
          >
            {locations.map((location) => (
              <button
                key={`${location.x}|${location.y}`}
                className={styles.option}
                onClick={handleLocationSelect(location)}
              >
                <Typography>{location.label}</Typography>
              </button>
            ))}
          </Placeholder>
        </Placeholder>
      </div>
    </Popover>
  );
};
