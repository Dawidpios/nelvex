"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Navigation.module.scss";
import { useSession, signOut } from "next-auth/react";
import { RxAvatar } from "react-icons/rx";

const NavigationDesc = () => {
  const { data: session } = useSession();

  const logOutHandler = () => {
    signOut({redirect: true, callbackUrl: "/"});
  };
  const isLogged = session && session.user;

  const src = `${session?.user?.image}`;

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
        <li className={styles.navigation_link_userPanel}>
          <Link href={`/user/${session?.user?.id}`}>
            {session?.user?.image ? (
              <Image
                loader={() => `${src}?w=${50}&q=${100 || 75}`} 
                src={src}
                width={50}
                height={50}
                quality={100}
                style={{borderRadius: '100%', border: '2px solid #20A4F3'}}
                priority={true}
                alt="Picture of the author"
              ></Image>
            ) : (
              <RxAvatar className={styles.defaultAvatar}/>
            )}
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
