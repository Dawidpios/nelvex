import { useState } from "react";
import { Link } from "react-router-dom";

import style from "../../styles/Navigation/NavigationMobile.module.scss";
import { CgMenuRound, CgCloseO } from "react-icons/cg";

const NavigationMobile = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const openMenuHandler = () => {
    setOpenMenu((prevState) => !prevState);
  };

  return (
    <div>
      {openMenu ? (
        <CgCloseO
          className={style.barMenuClose}
          onClick={openMenuHandler}
        ></CgCloseO>
      ) : (
        <CgMenuRound
          className={style.barMenuOpen}
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
