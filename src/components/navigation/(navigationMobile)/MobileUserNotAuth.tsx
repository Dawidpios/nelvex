import Link from "next/link";
import styles from '../NavigationMobile.module.scss'

const MobileUserNotAuth = ({handleOpenMenu} : {handleOpenMenu: () => void}) => {
  return (
    <>
      <li className={styles.navigation_link}>
        <Link href={`/register`} onClick={handleOpenMenu}>
          Register
        </Link>
      </li>
      <li className={styles.navigation_link}>
        <Link href={`/login`} onClick={handleOpenMenu}>
          Login
        </Link>
      </li>
    </>
  );
};

export default MobileUserNotAuth;
