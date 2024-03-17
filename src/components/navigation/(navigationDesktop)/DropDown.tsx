import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from '../NavigationDesktop.module.scss'

type Props = {
  setUserPlayground: (value: string) => void;
};

const style = {
  textAlign: 'center',
  fontSize: '1rem',
  a: {
    color: 'red'
  },
  '&:hover': {
    backgroundColor: '#c6c6c6eb'
  }
};
export default function DropDown({ setUserPlayground }: Props) {
  const { data: session } = useSession();

  const logOutHandler = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        style={{color:'red', fontWeight: 'bold'}}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        User panel
      </Button>
      <Menu
        disableScrollLock={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem style={{
  textAlign: 'center',
  fontSize: '1rem'
}} onClick={handleClose}>
          <Link
            className={styles.menuItem}
            href={`/user/${session?.user?.id}`}
            // onClick={() => {
            //   // setUserPlayground("profile");
            // }}
          >
            User panel
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={styles.menuItem} href={`/product/add`}>Add product</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={styles.menuItem} href={`/`} onClick={logOutHandler}>
            Log out
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}