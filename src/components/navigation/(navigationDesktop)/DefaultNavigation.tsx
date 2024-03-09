import Link from "next/link";
import styles from "../NavigationDesktop.module.scss";
import { usePathname } from "next/navigation";
const DefaultNavigation = ({ isLogged }: { isLogged: boolean | null }) => {
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
      {!isLogged && (
        <>
          <li
            className={
              path == "/register"
                ? styles.navigation_link_active
                : styles.navigation_link
            }
          >
            {" "}
            <Link className={styles.navigation_link} href={`/register`}>
              Register
            </Link>
          </li>
          <li
            className={
              path == "/login"
                ? styles.navigation_link_active
                : styles.navigation_link
            }
          >
            <Link href={`/login`}>Login</Link>
          </li>
        </>
      )}
    </>
  );
};

export default DefaultNavigation;
