import Link from "next/link";
import styles from "../NavigationDesktop.module.scss";

const UserNotAuth = () => {
  return (
    <>
      <button className={styles.navigation_button}>
        <Link href={`/register`}>Register</Link>
      </button>
      <button className={styles.navigation_button}>
        <Link href={`/login`}>Login</Link>
      </button>
    </>
  );
};

export default UserNotAuth;
