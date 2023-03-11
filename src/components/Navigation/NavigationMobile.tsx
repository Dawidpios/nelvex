import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import style from "../../styles/Navigation/NavigationMobile.module.scss";
import { CgMenuRound, CgCloseO } from "react-icons/cg";

const NavigationMobile = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const portalID = document.getElementById("root") as HTMLElement;
  const openMenuHandler = () => {
    setOpenMenu((prevState) => !prevState);
  };

  return (
    <div className={style.naviContainer}>
      {openMenu ? (
        <CgCloseO
          className={style.barMenu}
          onClick={openMenuHandler}
        ></CgCloseO>
      ) : (
        <CgMenuRound
          className={style.barMenu}
          onClick={openMenuHandler}
        ></CgMenuRound>
      )}
      <div
        className={`${style.navigation} ${
          openMenu ? style.openMenu : style.closeMenu
        }`}
      >
        <ul className={style.navigation_ul}>
          <li className={style.navigation_ul_li}>
            <Link to="/">Home</Link>
          </li>
          <li className={style.navigation_ul_li}>
            <Link to="/favorites">Favorites</Link>
          </li>
          <li className={style.navigation_ul_li}>
            <Link to="/gift">Gift Cards</Link>
          </li>
          <li className={style.navigation_ul_li}>
            <Link to="/login">Login</Link>
          </li>
          <li className={style.navigation_ul_li}>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationMobile;
