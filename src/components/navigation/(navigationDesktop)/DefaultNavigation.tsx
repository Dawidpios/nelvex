import Link from "next/link";
import styles from "../NavigationDesktop.module.scss";
import { usePathname } from "next/navigation";
const DefaultNavigation = () => {
  const path = usePathname();

  return (
    <>
      <li
        className={
          path == "/" ? styles.navigation_link_active : styles.navigation_link
        }
      >
        <Link href={`/`}>Home Page</Link>
      </li>
      <li
        className={
          path == "/product"
            ? styles.navigation_link_active
            : styles.navigation_link
        }
      >
        <Link href={`/product`}>Products</Link>
      </li>
    </>
  );
};

export default DefaultNavigation;
