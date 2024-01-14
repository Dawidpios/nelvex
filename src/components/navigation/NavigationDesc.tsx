"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Navigation.module.scss";
import { useSession, signOut } from "next-auth/react";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import { useGlobalContext } from "../../../app/Context/store";

const NavigationDesc = () => {
  const { setUserPlayground } = useGlobalContext();
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session } = useSession();

  const logOutHandler = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };
  const isLogged = session && session.user;

  const src = `${session?.user?.image}`;
  const handleUserMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <>
      <ul className={styles.navigation_ul}>
        <li className={styles.navigation_link}>
          <Link href={`/`}>Home Page</Link>
        </li>
        <li className={styles.navigation_link}>
          <Link href={`/product`}>Products</Link>
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
            <>
              {session?.user?.image ? (
                <Image
                  onClick={handleUserMenu}
                  loader={() => `${src}?w=${50}&q=${100 || 75}`}
                  src={src}
                  width={50}
                  height={50}
                  quality={100}
                  style={{ borderRadius: "100%", border: "2px solid #20A4F3" }}
                  priority={true}
                  alt="Picture of the author"
                ></Image>
              ) : (
                <RxAvatar
                  onClick={handleUserMenu}
                  className={styles.defaultAvatar}
                />
              )}
            </>
          </li>
        )}
      </ul>
      {isLogged && (
        <ul
          className={`${styles.user_menu} ${openMenu ? styles.openMenu : ""}`}
        >
          <li>
            <Link href={`/user/${session?.user?.id}`} onClick={() => {
                setUserPlayground("profile");
                handleUserMenu()
              }}>User panel</Link>
          </li>
          <li>
            <Link
              href={`/user/${session?.user?.id}`}
              onClick={() => {
                setUserPlayground("cart");
                handleUserMenu()
              }}
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              href={`/product/add`}
              onClick={() => {
                handleUserMenu()
              }}
            >
              Add product
            </Link>
          </li>
          <li>
            <Link href={`/`} onClick={logOutHandler}>
              Log out
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default NavigationDesc;
