import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';

import styles from './booking-time-select.module.scss';

const data = [
  { day: 'Sat', number: '20', month: 'May' },
  { day: 'Sun', number: '21', month: 'May' },
  { day: 'Mon', number: '22', month: 'May' },
  { day: 'Thu', number: '23', month: 'May' },
  { day: 'Wed', number: '24', month: 'May' },
];

export const BookingTimeSelect = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Icon width={18} height={18} name='arrow-left' />
        <Typography variant='body1'>Thursday, 18, May</Typography>
        <Icon width={18} height={18} name='arrow-right' />
      </div>
      <div className={styles.main}>
        <div className={styles.dataBoxCheked}>
          <Typography variant='body2' className={styles.infoCheked}>
            Thu
          </Typography>
          <Typography variant='body2' className={styles.infoCheked}>
            18
          </Typography>
          <Typography variant='body2' className={styles.infoCheked}>
            May
          </Typography>
        </div>

        <div className={styles.dataBoxBooked}>
          <Typography variant='body2' className={styles.infoBooked}>
            Fri
          </Typography>
          <Typography variant='body2' className={styles.infoBooked}>
            19
          </Typography>
          <Typography variant='body2' className={styles.infoBooked}>
            May
          </Typography>
        </div>
        {data.map((item, index) => (
          <div key={index} className={styles.dataBox}>
            <Typography variant='body2' className={styles.info}>
              {item.day}
            </Typography>
            <Typography variant='body2' className={styles.info}>
              {item.number}
            </Typography>
            <Typography variant='body2' className={styles.info}>
              {item.month}
            </Typography>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.timeBox}>
          <Typography className={styles.timeText}>11:00 - 12:00</Typography>
        </div>
        <div className={styles.timeBox2}>
          <Typography className={styles.timeText2}>13:00 - 14:00</Typography>
        </div>
        <div className={styles.timeBox3}>
          <Typography className={styles.timeText3}>15:00 - 16:00</Typography>
        </div>
        <div className={styles.timeBox3}>
          <Typography className={styles.timeText3}>17:00 - 18:00</Typography>
        </div>
        <div className={styles.timeBox3}>
          <Typography className={styles.timeText3}>19:00 - 20:00</Typography>
        </div>
        <div className={styles.timeBox3}>
          <Typography className={styles.timeText3}>21:00 - 22:00</Typography>
        </div>
      </div>
    </div>
  );
};
