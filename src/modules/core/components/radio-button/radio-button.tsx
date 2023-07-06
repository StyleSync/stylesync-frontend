import { type FC, createContext, useContext, useRef } from 'react';
// hooks
import { useRipple } from '@/modules/core/hooks/use-ripple';

import type {
  RadioButtonProps,
  RadioGroupProps,
  RadioGroupContextValue,
} from './radio-button.interface';
import styles from './radio-button.module.scss';

const RadioGroupContext = createContext<RadioGroupContextValue>({
  activeValue: null,
  name: '',
  onChange: () => {},
});

const RadioButton: FC<RadioButtonProps> & {
  Group: FC<RadioGroupProps>;
} = ({ value }) => {
  // refs
  const rootRef = useRef<HTMLLabelElement>(null);
  // context
  const { activeValue, name, onChange } = useContext(RadioGroupContext);

  useRipple(rootRef);

  return (
    <label className={styles.root} ref={rootRef}>
      <input
        type='radio'
        name={name}
        value={value}
        checked={activeValue === value}
        onChange={() => onChange(value)}
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
