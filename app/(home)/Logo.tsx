"use client";
import Image from "next/image";
import hero from "../../public/images/hero.svg";
import styles from "./homePage.module.scss";

const Logo = () => {
  return (
    <header className={styles.header}>
      <section className={styles.header_section}>
        <h1 className={styles.header_heading}>Let’s Dive in <span style={{color:"#FC9918"}}>Nelvex</span> World</h1>
        <h2 className={styles.header_heading_secondary}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          pharetra, phasellus imperdiet fringilla turpis lectus risus erat.
          Commodo purus, eu sed suspendisse fermentum{" "}
        </h2>
      </section>
      <div className={styles.header_imageContainer}>
        <Image
          src={hero}
          fill={true}
          style={{ objectFit: "fill" }}
          alt="hero image"
        />
      </div>
    </header>
  );
};

export default Logo;
