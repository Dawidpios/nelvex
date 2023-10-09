"use client";

import Sidebar from "./Sidebar";
import style from "./layout.module.scss";
import { useGlobalContext } from "../../Context/store";

const RootLayout = ({
  children,
  products,
  profile,
  buyHistory,
  topUp,
  currency,
}: {
  children: React.ReactNode;
  products: React.ReactNode;
  profile: React.ReactNode;
  buyHistory: React.ReactNode;
  topUp: React.ReactNode;
  currency: React.ReactNode;
}) => {
  const { userPlayground } = useGlobalContext();

  return (
    <div className={style.layout}>
      <Sidebar></Sidebar>
      {userPlayground === "profile" && profile}
      {userPlayground === "products" && products}
      {userPlayground === "history" && buyHistory}
      {userPlayground === "topup" && topUp}
      {userPlayground === "currency" && currency}
    </div>
  );
};

export default RootLayout;
