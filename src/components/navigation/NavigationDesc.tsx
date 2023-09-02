'use client'
import Link from "next/link";
import styles from './Navigation.module.scss'
import { useGlobalContext  } from '../../../app/Context/store';
import { useEffect } from "react";

const NavigationDesc = () => {
  const {isLogged, setIsLogged} = useGlobalContext()

  const logOutHandler = () => {
    sessionStorage.removeItem('Logged')
    setIsLogged(false)
  }
  useEffect(() => {
    console.log(isLogged)
  },  [isLogged])

  return ( 
    <ul className={styles.navigation_ul}>
      <li className={styles.navigation_link}><Link href={`/`}>Home Page</Link></li>
      <li className={styles.navigation_link}><Link href={`/promotions`}>Promotions</Link></li>
      {!isLogged ? (
        <>
          <li className={styles.navigation_link}><Link href={`/login`}>Login</Link></li>
          <li className={styles.navigation_link}><Link href={`/register`}>Register</Link></li>
        </>
      ) : (
          <li className={styles.navigation_link}><Link href={`/`} onClick={logOutHandler}>Log out</Link></li>
      )}
      
    </ul>
   );
}
 
export default NavigationDesc;