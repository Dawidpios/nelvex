import Link from "next/link";
import styles from "../NavigationMobile.module.scss";

const DefaultMobileNavigation = ({handleOpenMenu} : {handleOpenMenu: () => void}) => {
  return (
    <>
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
    </>
  );
};

export default DefaultMobileNavigation;
