import Link from "next/link";
import Image from "next/image";
import styles from "../NavigationDesktop.module.scss";
import { FiShoppingCart } from "react-icons/fi";
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
          <FiShoppingCart className={styles.cart} />
        </Link>

        {session?.user?.image ? (
          <div className={styles.navigation_imageContainer}>
            <Image
              onClick={handleUserMenu}
              loader={() => `${src}?w=${50}&q=${100 || 75}`}
              src={src}
              fill={true}
              quality={100}
              style={{ borderRadius: "100%", border: "2px solid #FC9918" }}
              priority={true}
              alt="Picture of the author"
            ></Image>
          </div>
        ) : (
          <RxAvatar onClick={handleUserMenu} className={styles.defaultAvatar} />
        )}
      </>
    </div>
  );
};

export default UserAuth;
