"use client";

import styles from "../NavigationDesktop.module.scss";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "../../../../app/Context/store";
import UserAuth from "./UserAuth";
import DefaultNavigation from "./DefaultNavigation";

const NavigationDesc = () => {
  const { setUserPlayground } = useGlobalContext();
  const { data: session, status } = useSession();

  const isLogged = session && status === "authenticated";

  return (
    <>
      <ul className={styles.navigation_ul}>
        <DefaultNavigation isLogged={isLogged} />
        {isLogged && (
          <UserAuth
            setUserPlayground={setUserPlayground}
          />
        )}
      </ul>
    </>
  );
};

export default NavigationDesc;
