"use client";

import Link from "next/link";
import styles from "./Navigation.module.scss";
import { useSession, signOut } from "next-auth/react";

const NavigationDesc = () => {
  const { data: session } = useSession();

  const logOutHandler = () => {
    signOut();
  };
  const isLogged = session && session.user;
  return (
    <ul className={styles.navigation_ul}>
      <li className={styles.navigation_link}>
        <Link href={`/`}>Home Page</Link>
      </li>
      <li className={styles.navigation_link}>
        <Link href={`/promotions`}>Promotions</Link>
      </li>
      {!isLogged ? (
        <>
          <li className={styles.navigation_link}>
            <Link href={`/register`}>Register</Link>
          </li>
          <li className={styles.navigation_link}>
            <Link href={`/login`}>Login</Link>
          </li>
        </>
      ) : (
        <li className={styles.navigation_link}>
          <Link href={`/user/${session?.user?.id}`}>
            {session?.user?.name}
          </Link>
          <Link href={`/`} onClick={logOutHandler}>
            Log out
          </Link>
        </li>
      )}
    </ul>
  );
};

export default NavigationDesc;
