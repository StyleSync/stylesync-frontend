import type { Currency } from '@/modules/core/types/currency.types';
import type { IconName } from '@/modules/core/components/icon';

export const currencies: Currency[] = ['USD', 'EUR', 'UAH'];

export const currencyMeta: Record<
  Currency,
  {
    icon: IconName;
  }
> = {
  USD: {
    icon: 'flag-usa',
  },
  EUR: {
    icon: 'flag-europe',
  },
  UAH: {
    icon: 'flag-ukraine',
  },
};
