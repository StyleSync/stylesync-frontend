import {
  type ChangeEvent,
  createContext,
  type FC,
  useCallback,
  useContext,
  useRef,
} from 'react';

import { useRipple } from '@/modules/core/hooks/use-ripple';

import type {
  RadioButtonProps,
  RadioGroupContextValue,
  RadioGroupProps,
} from './radio-button.interface';

import styles from './radio-button.module.scss';

const RadioGroupContext = createContext<RadioGroupContextValue>({
  activeValue: null,
  name: '',
  onChange: () => {},
});

const RadioButton: FC<RadioButtonProps> & {
  Group: FC<RadioGroupProps>;
} = ({ value, disabled }) => {
  // refs
  const rootRef = useRef<HTMLLabelElement>(null);
  // context
  const { activeValue, name, onChange } = useContext(RadioGroupContext);

  useRipple(rootRef);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <label className={styles.root} ref={rootRef}>
      <input
        type='radio'
        name={name}
        value={value}
        checked={activeValue === value}
        onChange={handleChange}
        disabled={disabled}
      />
      <div className={styles.radio}>
        <div className={styles.dot} />
      </div>
    </label>
  );
};

const RadioGroup: FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  children,
}) => {
  return (
    <RadioGroupContext.Provider value={{ activeValue: value, onChange, name }}>
      {children}
    </RadioGroupContext.Provider>
  );
};

RadioButton.Group = RadioGroup;

export { RadioButton };
