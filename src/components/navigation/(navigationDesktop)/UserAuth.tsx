import Link from "next/link";
import Image from "next/image";
import styles from "../NavigationDesktop.module.scss";
import { FiShoppingCart } from "react-icons/fi";
import { useSession } from "next-auth/react";
import DropDown from "./DropDown";

type Props = {
  setUserPlayground: (value: string) => void;
};

const UserAuth = ({setUserPlayground }: Props) => {
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
          <DropDown setUserPlayground={setUserPlayground} />
        )}
      </>
    </div>
  );
};

export default UserAuth;
