"use client";

import { useState } from "react";
import Link from "next/link";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";
import styles from "./NavigationMobile.module.scss";

const NavigationMobile = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session } = useSession();

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const logOutHandler = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  const isLogged = session && session.user;

  return (
    <>
      <div className={`${styles.navigation} ${openMenu && styles.openMenu}`}>
        <ul className={`${styles.navigation_ul}`}>
          <li className={styles.navigation_link}>
            <Link href={`/`} onClick={handleOpenMenu}>
              Home Page
            </Link>
          </li>
          <li className={styles.navigation_link}>
            <Link href={`/product`} onClick={handleOpenMenu}>
              Products
            </Link>
          </li>
          {!isLogged ? (
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
          ) : (
            <li className={styles.navigation_link_userPanel}>
              <Link href={`/product/add`} onClick={handleOpenMenu}>
                Add product
              </Link>
              <Link
                href={`/user/${session?.user?.id}`}
                onClick={handleOpenMenu}
              >
                {session?.user?.name}
              </Link>
              <Link href={`/`} onClick={logOutHandler}>
                Log out
              </Link>
            </li>
          )}
        </ul>
      </div>
      <MdKeyboardDoubleArrowDown
        onClick={handleOpenMenu}
        className={`${styles.icon} ${openMenu && styles.reverseIcon}`}
      />
    </>
  );
};

export default NavigationMobile;
