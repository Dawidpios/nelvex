import Link from "next/link";
import styles from "./homePage.module.scss";
import Button from "@/components/button/Button";
import Carousel from "@/components/carousel/Carousel";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
  category: string;
  image: string;
};

const getBestProducts = async () => {
  const result = await fetch(process.env.URL_API +"/getProducts", {
    method: "GET",
    cache: 'force-cache'
  });

  const products = await result.json();
  const filteredProducts = products.sort((a: Product, b: Product) => {
    if (a.hasOwnProperty("rating") && b.hasOwnProperty("rating")) {
      return b.rating.rate - a.rating.rate;
    }
  });
  return filteredProducts.slice(0, 3);
};

const BestProducts = async () => {
  const bestProducts = await getBestProducts();

  return (
    <article className={styles.bestProductContainer}>
      <section className={styles.bestProduct_header}>
        <h1>Best Rated Products</h1>
        <Button className='bestProduct_header_button'>
          <Link href="/product">View all</Link>
        </Button>
      </section>
      <Carousel children={bestProducts} autoplay={true} className="bestProductCarousel"/>
    </article>
  );
};

export default BestProducts;
