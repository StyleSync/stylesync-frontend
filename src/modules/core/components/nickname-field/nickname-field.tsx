import { type ChangeEvent, type FC, useEffect } from 'react';

import { useIntl } from 'react-intl';

import { HoverTooltip } from '@/modules/core/components/hover-tooltip';
import { Icon } from '@/modules/core/components/icon';
import { TextField } from '@/modules/core/components/text-field';
import { useDebounce } from '@/modules/core/hooks/use-debounce';
import { trpc } from '@/modules/core/utils/trpc.utils';

import { type NickNameFieldProps } from './nickname-field.interface';

const nicknameRegax = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':",.<>?/]{1,32}$/;

export const NickNameField: FC<NickNameFieldProps> = ({
  label,
  value,
  error,
  setError,
  clearErrors,
  onChange,
}) => {
  const intl = useIntl();

  const debounceValue = useDebounce(value);

  const { data: me } = trpc.user.me.useQuery();

  const { data } = trpc.user.checkNickname.useQuery(
    { nickname: debounceValue || '' },
    { enabled: !!debounceValue }
  );

  useEffect(() => {
    if (data?.available === false && data?.userId !== me?.id) {
      setError('nickname', {
        message: intl.formatMessage({
          id: 'user.about.professional.form.nickname.dublicate',
        }),
      });
    }
  }, [intl, setError, data?.available, me?.id, data?.userId]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearErrors('nickname');
    onChange(event.target.value);
  };

  return (
    <TextField
      onChange={handleChange}
      className='z-10'
      error={error}
      variant='input'
      label={label}
      value={value}
      classes={{
        endAdornment: '!right-4 !z-30 !mt-[3px]',
      }}
      endAdornment={
        data?.available && nicknameRegax.test(value || '') ? (
          <Icon
            className='right-20 z-20 text-green'
            width={22}
            height={22}
            name='check-mark'
          />
        ) : (
          <HoverTooltip
            content={
              <span>
                <span className='font-semibold'>
                  {intl.formatMessage({ id: 'nickname' })}
                </span>{' '}
                – {intl.formatMessage({ id: 'nickname.contents' })}
              </span>
            }
            trigger={
              <Icon
                className={`right-20 z-20 transition-colors duration-300 hover:text-primary ${!data?.available ? 'text-destructive' : 'text-gray'}`}
                width={22}
                height={22}
                name='qustion'
              />
            }
          />
        )
      }
    />
  );
};
