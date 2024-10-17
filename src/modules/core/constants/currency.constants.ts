import type { Currency } from '@/modules/core/types/currency.types';
import type { IconName } from '@/modules/core/components/icon';

export const currencies: Currency[] = ['UAH', 'USD', 'EUR',];

export const currencyMeta: Record<
  Currency,
  {
    icon: IconName;
  }
> = {
  UAH: {
    icon: 'flag-ukraine',
  },
  USD: {
    icon: 'flag-usa',
  },
  EUR: {
    icon: 'flag-europe',
  },
 
};
