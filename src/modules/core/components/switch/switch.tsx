import { type FC } from 'react';

import clsx from 'clsx';

import { SwitchProps } from './switch.interface';

export const Switch: FC<SwitchProps> = ({ checked = false, onChange }) => {
  const toggle = () => {
    const newValue = !checked;

    onChange?.(newValue);
  };

  return (
    <button
      type='button'
      onClick={toggle}
      className={clsx(
        'relative inline-flex h-7 w-[50px] items-center rounded-full transition-colors',
        checked ? 'bg-primary' : 'bg-gray-300'
      )}
    >
      <span
        className={clsx(
          'inline-block h-6 w-6 transform rounded-full bg-white transition-transform',
          checked ? 'translate-x-6' : 'translate-x-[2px]'
        )}
      />
    </button>
  );
};
