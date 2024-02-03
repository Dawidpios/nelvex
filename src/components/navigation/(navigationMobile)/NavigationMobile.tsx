"use client";

import { useState } from "react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useSession } from "next-auth/react";
import styles from "../NavigationMobile.module.scss";
import MobileUserNotAuth from "./MobileUserNotAuth";
import MobileUserAuth from "./MobileUserAuth";
import DefaultMobileNavigation from "./DefaultMobileNavigation";

const NavigationMobile = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session, status } = useSession();

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const isLogged = session && status === "authenticated";

  return (
    <>
      <div className={`${styles.navigation} ${openMenu && styles.openMenu}`}>
        <ul className={`${styles.navigation_ul}`}>
          <DefaultMobileNavigation handleOpenMenu={handleOpenMenu} />
          {!isLogged ? (
            <MobileUserNotAuth handleOpenMenu={handleOpenMenu} />
          ) : (
            <MobileUserAuth handleOpenMenu={handleOpenMenu} />
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
