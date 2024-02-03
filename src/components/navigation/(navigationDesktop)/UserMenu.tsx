import Link from "next/link";
import styles from "../NavigationDesktop.module.scss";
import { signOut, useSession } from "next-auth/react";

type Props = {
  openMenu: boolean;
  handleUserMenu: () => void;
  setUserPlayground: (value: string) => void;
};

const UserMenu = ({ openMenu, handleUserMenu, setUserPlayground }: Props) => {
  const { data: session } = useSession();

  const logOutHandler = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <ul className={`${styles.user_menu} ${openMenu ? styles.openMenu : ""}`}>
      <li>
        <Link
          href={`/user/${session?.user?.id}`}
          onClick={() => {
            setUserPlayground("profile");
            handleUserMenu();
          }}
        >
          User panel
        </Link>
      </li>
      <li>
        <Link
          href={`/product/add`}
          onClick={() => {
            handleUserMenu();
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
  );
};

export default UserMenu;
