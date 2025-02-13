import { useEffect, type ChangeEvent, type FC } from 'react';
import { useIntl } from 'react-intl';
// components
import { Icon } from '@/modules/core/components/icon';
import { TextField } from '@/modules/core/components/text-field';
import { HoverTooltip } from '@/modules/core/components/hover-tooltip';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// hooks
import { UseDebounce } from '@/modules/core/hooks/use-debounce';
// types
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

  const debounceValue = UseDebounce(value);

  const { data } = trpc.user.checkNickname.useQuery(
    { nickname: debounceValue || '' },
    { enabled: !!debounceValue }
  );

  useEffect(() => {
    if (data?.available === false) {
      setError('nickname', {
        message: intl.formatMessage({
          id: 'user.about.professional.form.nickname.dublicate',
        }),
      });
    }
  }, [intl, setError, data?.available]);

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
