import Link from "next/link";
import styles from './currency.module.scss'

const Currency = () => {
  return (
    <>
      <h1 className={styles.header}>We are working on it...</h1>
      <Link href={'/'} className={styles.link}> Return to home page</Link>
    </>
  );
};

export default Currency;
