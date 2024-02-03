import Link from "next/link";
import styles from '../NavigationMobile.module.scss'
import { useSession, signOut } from "next-auth/react";

const MobileUserAuth = ({handleOpenMenu} : {handleOpenMenu: () => void}) => {
  const { data: session } = useSession();
  
  const logOutHandler = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <li className={styles.navigation_link_userPanel}>
      <Link href={`/product/add`} onClick={handleOpenMenu}>
        Add product
      </Link>
      <Link href={`/user/${session?.user?.id}`} onClick={handleOpenMenu}>
        {session?.user?.name}
      </Link>
      <Link href={`/`} onClick={logOutHandler}>
        Log out
      </Link>
    </li>
  );
};

export default MobileUserAuth;
