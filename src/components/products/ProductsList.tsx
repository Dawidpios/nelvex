import styles from "./ProductList.module.scss";
import ProductCard from "./ProductCart";

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

type Props = {
  products: Product[];
};

const ProductsList = async ({ products }: Props) => {
  return (
    <ul className={styles.productList_container} key={Math.random()}>
      {products &&
        products.map((product: Product) => <ProductCard product={product} />)}
    </ul>
  );
};

export default ProductsList;
