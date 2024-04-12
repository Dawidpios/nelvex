import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import styles from './homePage.module.scss'

const Footer = () => {
  return ( 
    <section className={styles.footerSection}>
      <div className={styles.footerOwnerinfo}>
        <h1>Developed by</h1>
        <p>Dawid Pioś</p>
        <p>E-mail: dawid.pios00@gmail.com</p>
      </div>
      <div className={styles.linksContainer}>
        <Link href={process.env.GITHUBURL}>Github profile <br /> <FaGithub className={styles.gitIcon}/></Link>
      </div>
    </section>
   );
}
 
export default Footer;