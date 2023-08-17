import { UserHeader } from '@/modules/user/components';
import styles from './profile.module.scss';

export default function Profile() {
  return (
    <main>
      <section className={styles.section}>
        <UserHeader />
      </section>
    </main>
  );
}
