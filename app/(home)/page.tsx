import Logo from "./Logo";
import { Truculenta } from "next/font/google";
import OfferArticle from "./offerArticle";
import BestProducts from "./BestProducts";
import styles from './homePage.module.scss'
import { Suspense } from "react";
export const dynamic = 'force-dynamic'

const truculenta = Truculenta({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const HomePage = async () => {

  return (
    <div className={truculenta.className}>
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
