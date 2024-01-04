"use client";

import Sidebar from "./Sidebar";
import style from "./layout.module.scss";
import { useGlobalContext } from "../../Context/store";

const RootLayout = ({
  children,
  profile,
  buyHistory,
  cart,
  currency,
}: {
  children: React.ReactNode;
  profile: React.ReactNode;
  buyHistory: React.ReactNode;
  cart: React.ReactNode;
  currency: React.ReactNode;
}) => {
  const { userPlayground } = useGlobalContext();

  return (
    <div className={style.layout}>
      <Sidebar></Sidebar>
      {userPlayground === "profile" && profile}
      {userPlayground === "history" && buyHistory}
      {userPlayground === "cart" && cart}
      {userPlayground === "currency" && currency}
    </div>
  );
};

export default RootLayout;
