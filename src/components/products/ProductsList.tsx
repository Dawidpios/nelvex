import Image from "next/image";
import styles from "./ProductList.module.scss";
import Link from "next/link";
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
    <div className={styles.productList_container}>
      {products &&
        products.map((product: Product) => <ProductCard product={product} />)}
    </div>
  );
};

export default ProductsList;
