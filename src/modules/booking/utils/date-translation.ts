import { format } from 'date-fns';
import { useIntl } from 'react-intl';

export const useFormattedDate = (
  value: string | undefined,
  dateFormat: string,
  translationKey: string
) => {
  const intl = useIntl();

  // Format the date value
  const formattedValue = value
    ? format(new Date(value), dateFormat).toLowerCase()
    : '';

  return intl.formatMessage({ id: translationKey }, { value: formattedValue });
};
