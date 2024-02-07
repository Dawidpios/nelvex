import Logo from "./Logo";
import OfferArticle from "./offerArticle";
import BestProducts from "./BestProducts";
import styles from './homePage.module.scss'

const HomePage = async () => {

  return (
    <div>
      <Logo />
      <main className={styles.main}>
        <OfferArticle />
        <BestProducts />
      </main>
      <footer></footer>
    </div>
  );
};

export default HomePage;
