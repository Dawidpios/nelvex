import { useState } from "react";
import Link from "next/link";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import styles from "./NavigationMobile.module.scss";

const NavigationMobile = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className={`${styles.navigation} ${openMenu && styles.openMenu}`}>
      <ul className={`${styles.navigation_ul}`}>
        <li className={styles.navigation_link}>
          <Link href={`/`}>Home Page</Link>
        </li>
        <li className={styles.navigation_link}>
          <Link href={`/promotions`}>Promotions</Link>
        </li>
        <li className={styles.navigation_link}>
          <Link href={`/login`}>Login</Link>
        </li>
        <li className={styles.navigation_link}>
          <Link href={`/register`}>Register</Link>
        </li>
      </ul>
      <MdKeyboardDoubleArrowDown
        onClick={handleOpenMenu}
        className={`${styles.icon} ${openMenu && styles.reverseIcon}`}
      />
    </div>
  );
};

export default NavigationMobile;
