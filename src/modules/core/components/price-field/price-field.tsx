import {
  type FC,
  type ChangeEvent,
  type FocusEvent,
  Fragment,
  useCallback,
} from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
// components
import {
  Divider,
  Icon,
  Popover,
  TextField,
  Typography,
} from '@/modules/core/components';
// constants
import {
  currencies,
  currencyMeta,
} from '@/modules/core/constants/currency.constants';
// utils
import { formatPrice } from '@/modules/core/utils/price.utils';
// types
import type { Currency } from '@/modules/core/types/currency.types';

import type { PriceFieldProps } from './price-field.interface';
import styles from './price-field.module.scss';

export const PriceField: FC<PriceFieldProps> = ({
  price,
  currency,
  onPriceChange,
  onCurrencyChange,
  inputProps,
}) => {
  // state
  const isOpen = useBoolean();
  // memo
  const formattedPrice = formatPrice(price);

  const handleCurrencyClick = (_currency: Currency) => () => {
    onCurrencyChange(_currency);
    isOpen.setFalse();
  };

  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(',', '');

    if (value === '' || !isNaN(+value)) {
      onPriceChange(value.trim());
    }
  };

  const handleTextFieldFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const { value } = e.target;

      if (value.length > 0) {
        e.target.setSelectionRange(0, value.length);
      }
    },
    []
  );

  return (
    <div className={styles.root}>
      <TextField
        variant='input'
        value={formattedPrice}
        // value={price}
        onChange={handleTextFieldChange}
        onFocus={handleTextFieldFocus}
        {...inputProps}
      />
      <Popover
        isOpen={isOpen.value}
        onClose={isOpen.setFalse}
        trigger={
          <button
            className={clsx('focusable', styles.currency)}
            onClick={isOpen.toggle}
            type='button'
          >
            <Typography>{currency}</Typography>
            <Icon name={isOpen.value ? 'chevron-top' : 'chevron-bottom'} />
          </button>
        }
        side='bottom'
        align='end'
        sideOffset={2}
      >
        <div className={styles.options}>
          {currencies.map((_currency, index) => (
            <Fragment key={_currency}>
              <button
                className={clsx('focusable', styles.option, {
                  [styles.active]: _currency === currency,
                })}
                onClick={handleCurrencyClick(_currency)}
              >
                <Icon name={currencyMeta[_currency].icon} width={24} />
                <Typography>{_currency}</Typography>
              </button>
              {index !== currencies.length - 1 && (
                <Divider variant='horizontal' />
              )}
            </Fragment>
          ))}
        </div>
      </Popover>
    </div>
  );
};
