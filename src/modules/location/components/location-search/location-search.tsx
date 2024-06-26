import {
  type FC,
  type ChangeEvent,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { useIntl } from 'react-intl';
// components
import { Placeholder } from '@/modules/core/components/placeholder';
import { Icon } from '@/modules/core/components/icon';
import { TextField } from '@/modules/core/components/text-field';
import { Popover } from '@/modules/core/components/popover';
import { Typography } from '@/modules/core/components/typogrpahy';
// hooks
import { useLocationSearchQuery } from '@/modules/location/hooks/use-location-search-query';
import { useBoolean, useDebounceValue } from 'usehooks-ts';
// types
import type { LocationSearchProps } from './location-search.interface';
import type { SearchResult } from 'leaflet-geosearch/lib/providers/provider';
import type { RawResult } from 'leaflet-geosearch/lib/providers/openStreetMapProvider';
import styles from './location-search.module.scss';

const SEARCH_DEBOUNCE_DELAY = 200;
const MAX_ITEMS_SUGGESTED = 6;

export const LocationSearch: FC<LocationSearchProps> = ({
  value,
  onChange,
  inputProps,
}) => {
  const intl = useIntl();

  // state
  const isActive = useBoolean();
  const [query, setQuery] = useState(value?.name ?? '');
  const [queryDebounced] = useDebounceValue(query, SEARCH_DEBOUNCE_DELAY);
  // queries
  const locationSearchQuery = useLocationSearchQuery(queryDebounced);
  // memo
  const suggestions =
    locationSearchQuery.data?.slice(0, MAX_ITEMS_SUGGESTED) ?? [];

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
    (data: SearchResult<RawResult>) => () => {
      onChange({
        name: data.label,
        lat: data.y,
        lng: data.x,
      });
      isActive.setFalse();
    },
    [isActive, onChange]
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
          onBlur={handleTextFieldBlur}
          {...inputProps}
        />
      }
      forceTriggerWidth
      disablePortal
      disableAutofocus
    >
      <div className={styles.root}>
        <Placeholder
          isActive={suggestions.length === 0 && query.length === 0}
          placeholder={
            <div className={styles.placeholder}>
              <Icon name='info' />
              <Typography>
                {intl.formatMessage({
                  id: 'location.search.placeholder.typing',
                })}
              </Typography>
            </div>
          }
        >
          <Placeholder
            isActive={suggestions.length === 0 && query.length > 0}
            placeholder={
              <div className={styles.placeholder}>
                <Icon name='info' />
                <Typography>
                  {intl.formatMessage({
                    id: 'location.search.placeholder.notFound',
                  })}
                </Typography>
              </div>
            }
          >
            {suggestions.map((location) => (
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
