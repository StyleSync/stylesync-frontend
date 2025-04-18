import { type FC, useState } from 'react';
import { SwitchProps } from './switch.interface';
import clsx from 'clsx';

export const Switch: FC<SwitchProps> = ({ checked = false, onChange }) => {
  const [isOn, setIsOn] = useState(checked);

  const toggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      type='button'
      onClick={toggle}
      className={clsx(
        'relative inline-flex h-7 w-[50px] items-center rounded-full transition-colors',
        isOn ? 'bg-primary' : 'bg-gray-300'
      )}
    >
      <span
        className={clsx(
          'inline-block h-6 w-6 transform rounded-full bg-white transition-transform',
          isOn ? 'translate-x-6' : 'translate-x-[2px]'
        )}
      />
    </button>
  );
};
