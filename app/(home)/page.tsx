import Logo from "./Logo";
import OfferArticle from "./offerArticle";
import BestProducts from "./BestProducts";
import styles from './homePage.module.scss'
import { Suspense } from "react";
export const dynamic = 'force-dynamic'

const HomePage = async () => {

  return (
    <div>
      <Logo />
      <main className={styles.main}>
        <OfferArticle />
        <Suspense fallback={<div>Loading...</div>}>
          <BestProducts />
        </Suspense>
      </main>
      <footer></footer>
    </div>
  );
};

export default HomePage;
