import { type FC, type ChangeEvent, type FocusEvent, useCallback } from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
// components
import { Icon } from '@/modules/core/components/icon';
import { TextField } from '@/modules/core/components/text-field';
import { Typography } from '@/modules/core/components/typogrpahy';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
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
  currency = 'UAH',
  onPriceChange,
  onCurrencyChange,
  inputProps,
}) => {
  // state
  const isOpen = useBoolean();
  // memo
  const formattedPrice = formatPrice(price);

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
        onChange={handleTextFieldChange}
        onFocus={handleTextFieldFocus}
        {...inputProps}
      />
      <DropdownMenu
        isOpen={isOpen.value}
        onClose={isOpen.setFalse}
        items={currencies.map((_currency) => ({
          id: _currency,
          text: _currency,
          icon: currencyMeta[_currency].icon,
        }))}
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
        popoverProps={{
          side: 'bottom',
          align: 'end',
          backgroundBlurEffect: false,
        }}
        onSelect={(item) => {
          onCurrencyChange(item.id as Currency);
          isOpen.setFalse();
        }}
      />
    </div>
  );
};
