import Link from "next/link";
import styles from "./homePage.module.scss";
import ProductCard from "@/components/products/ProductCart";
import Button from "@/components/button/Button";

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
  const result = await fetch("http://localhost:3000/api/getProducts", {
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
        <ul className={styles.bestProduct_productList}>
          {bestProducts &&
            bestProducts.map((product: Product) => (
              <ProductCard product={product} className="bestProductCard" />
           ))}
        </ul>

    </article>
  );
};

export default BestProducts;
