import { type FC } from 'react';

// components
import { TextField } from '@/modules/core/components/text-field';

import type { PhoneFieldProps } from './phone-field.interface';
import {
  defaultCountries,
  FlagImage,
  usePhoneInput,
} from 'react-international-phone';
import { Icon } from '@/modules/core/components/icon';
import { useBoolean } from 'usehooks-ts';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';

export const PhoneField: FC<PhoneFieldProps> = () => {
  const isOpen = useBoolean();
  const {
    inputValue,
    phone,
    country,
    setCountry,
    handlePhoneValueChange,
    inputRef,
  } = usePhoneInput({
    defaultCountry: 'us',
    value: '+1 (234)',
    // onChange: ({ phone, inputValue, country }) => {
    //   // make something on change
    // },
  });

  return (
    <TextField
      ref={inputRef}
      variant='input'
      startAdornment={
        <DropdownMenu
          isOpen={isOpen.value}
          onClose={isOpen.setFalse}
          trigger={
            <div
              className='border-r cursor-pointer border-primary-light px-3 flex items-center gap-x-1'
              onClick={isOpen.setTrue}
            >
              <FlagImage iso2={country.iso2} size='30px' />
              <Icon name='chevron-bottom' className='!w-4 !h-4 shrink-0' />
            </div>
          }
          items={defaultCountries.map((item) => ({
            id: item[1],
            text: item[0],
            icon: <FlagImage size={20} iso2={item[1]} />,
          }))}
          onSelect={({ id }) => {
            setCountry(id);
            isOpen.setFalse();
          }}
          popoverProps={{
            classes: {
              content: 'max-h-[400px] overflow-y-auto',
            },
          }}
        />
      }
    />
  );
};
