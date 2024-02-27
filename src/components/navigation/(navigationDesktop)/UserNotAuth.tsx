import Link from "next/link";
import styles from "../NavigationDesktop.module.scss";
import Button from "@/components/button/Button";

const UserNotAuth = () => {
  return (
    <>
      <Button className='navigation_button'>
        <Link href={`/register`}>Register</Link>
      </Button>
      <Button className='navigation_button'>
        <Link href={`/login`}>Login</Link>
      </Button>
    </>
  );
};

export default UserNotAuth;
