'use client'
import { useGlobalContext } from "../../Context/store";
import style from "./sidebar.module.scss";

const Sidebar = () => {
  const { setUserPlayground } = useGlobalContext();

  return (
    <ul className={style.listContainer}>
      <li className={style.listElement} onClick={() => setUserPlayground("profile")}>Profile</li>
      <li className={style.listElement} onClick={() => setUserPlayground("products")}>Products</li>
      <li className={style.listElement} onClick={() => setUserPlayground("history")}>History</li>
      <li className={style.listElement} onClick={() => setUserPlayground("topup")}>Top up</li>
      <li className={style.listElement} onClick={() => setUserPlayground("currency")}>Currency</li>
    </ul>
  );
};

export default Sidebar;
