import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import styles from './homePage.module.scss'
import { Url } from "next/dist/shared/lib/router/router";

const Footer = () => {
  const GitUrl = process.env.GITHUBURL as Url
  return ( 
    <section className={styles.footerSection}>
      <div className={styles.footerOwnerinfo}>
        <h1>Developed by</h1>
        <p>Dawid Pioś</p>
        <p>E-mail: dawid.pios00@gmail.com</p>
      </div>
      <div className={styles.linksContainer}>
        <Link href={GitUrl}>Github profile <br /> <FaGithub className={styles.gitIcon}/></Link>
      </div>
    </section>
   );
}
 
export default Footer;