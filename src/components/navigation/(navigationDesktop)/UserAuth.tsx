import Link from "next/link";
import Image from "next/image";
import styles from "../NavigationDesktop.module.scss";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import { useSession } from "next-auth/react";

type Props = {
  handleUserMenu: () => void;
  setUserPlayground: (value: string) => void;
};

const UserAuth = ({ handleUserMenu, setUserPlayground }: Props) => {
  const { data: session } = useSession();
  const src = `${session?.user?.image}`;

  return (
    <div className={styles.navigation_link_userPanel}>
      <>
        <Link
          href={`/user/${session?.user?.id}`}
          onClick={() => {
            setUserPlayground("cart");
          }}
        >
          <HiMiniShoppingCart className={styles.cart} />
        </Link>

        {session?.user?.image ? (
          <Image
            onClick={handleUserMenu}
            loader={() => `${src}?w=${50}&q=${100 || 75}`}
            src={src}
            width={50}
            height={40}
            quality={100}
            style={{ borderRadius: "100%", border: "2px solid #FC9918" }}
            priority={true}
            alt="Picture of the author"
          ></Image>
        ) : (
          <RxAvatar onClick={handleUserMenu} className={styles.defaultAvatar} />
        )}
      </>
    </div>
  );
};

export default UserAuth;