import { TextField } from '@/modules/core/components/text-field';

import styles from './booking-form.module.scss';

export const BookingForm = () => {
  return (
    <div className={styles.container}>
      <TextField variant='input' label='Name*' />
      <TextField variant='input' label='Phone*' />
      <TextField variant='input' label='Email' />
      <TextField variant='textarea' label='Comment' />
    </div>
  );
};
