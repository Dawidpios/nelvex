"use client";

import styles from "../NavigationDesktop.module.scss";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useGlobalContext } from "../../../../app/Context/store";
import UserMenu from "./UserMenu";
import UserNotAuth from "./UserNotAuth";
import UserAuth from "./UserAuth";
import DefaultNavigation from "./DefaultNavigation";

const NavigationDesc = () => {
  const { setUserPlayground } = useGlobalContext();
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session, status } = useSession();

  const isLogged = session && status === "authenticated";

  const handleUserMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <>
      <ul className={styles.navigation_ul}>
        <DefaultNavigation />
        {!isLogged ? (
          <UserNotAuth />
        ) : (
          <UserAuth
            handleUserMenu={handleUserMenu}
            setUserPlayground={setUserPlayground}
          />
        )}
      </ul>
      {isLogged && (
        <UserMenu
          openMenu={openMenu}
          handleUserMenu={handleUserMenu}
          setUserPlayground={setUserPlayground}
        />
      )}
    </>
  );
};

export default NavigationDesc;