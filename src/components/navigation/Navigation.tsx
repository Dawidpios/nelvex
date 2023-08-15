import Link from "next/link";
import styles from './Navigation.module.scss'

const Navigation = () => {
  return ( 
    <ul className={styles.navigation_ul}>
      <li className={styles.navigation_link}><Link href={`/`}>Home Page</Link></li>
      <li className={styles.navigation_link}><Link href={`/promotions`}>Promotions</Link></li>
      <li className={styles.navigation_link}><Link href={`/login`}>Login</Link></li>
      <li className={styles.navigation_link}><Link href={`/register`}>Register</Link></li>
    </ul>
   );
}
 
export default Navigation;