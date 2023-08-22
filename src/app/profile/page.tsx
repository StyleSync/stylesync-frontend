import { UserHeader } from '@/modules/user/components';
import styles from './profile.module.scss';

export default function Profile() {
  return (
    <main className={styles.root}>
      <section className={styles.section}>
        <UserHeader />
      </section>
    </main>
  );
}
