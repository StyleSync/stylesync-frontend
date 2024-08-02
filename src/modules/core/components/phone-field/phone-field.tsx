import { type FC } from 'react';
import { useBoolean } from 'usehooks-ts';
import { FlagImage, usePhoneInput } from 'react-international-phone';
// components
import { TextField } from '@/modules/core/components/text-field';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import { Icon } from '@/modules/core/components/icon';
// constants
import { countries } from '@/modules/core/constants/country.constants';
// types
import type { PhoneFieldProps } from './phone-field.interface';

export const PhoneField: FC<PhoneFieldProps> = ({
  label,
  onChange,
  value,
  error,
}) => {
  const isOpen = useBoolean();

  const { inputValue, country, setCountry, handlePhoneValueChange, inputRef } =
    usePhoneInput({
      defaultCountry: 'ua',
      value,
      onChange: ({ phone }) => {
        if (onChange) {
          onChange(phone);
        }
      },
    });

  return (
    <TextField
      error={error}
      label={label}
      value={inputValue}
      ref={inputRef}
      variant='input'
      onChange={handlePhoneValueChange}
      startAdornment={
        <DropdownMenu
          isOpen={isOpen.value}
          onClose={isOpen.setFalse}
          trigger={
            <div
              className='border-r cursor-pointer border-primary-light pl-8 pr-5 flex items-center gap-x-2'
              onClick={isOpen.setTrue}
            >
              <FlagImage iso2={country.iso2} size='30px' />
              <Icon
                name='chevron-bottom'
                className='!w-[24px] !h-[12px] shrink-0 text-gray'
              />
            </div>
          }
          items={countries.map((item) => ({
            id: item[1],
            text: `${item[0]} +${item[2]}`,
            startSlot: <FlagImage size={20} iso2={item[1]} />,
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
