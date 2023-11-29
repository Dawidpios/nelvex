import { Card, Space } from "antd";
import Image from "next/image";
import styles from './ProductList.module.scss'

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
};

const getProducts = async () => {
  const dbProducts = await fetch("http://localhost:3000/api/getProducts", {
    method: "GET",
  });
  const result = await dbProducts.json();

  return result;
};

const imageStyle = {
  borderRadius: '2%',
}

const ProductsList = async () => {
  const data = await getProducts();
  const { products } = data;

  return (
    <div className={styles.productList_container}>
      {products &&
        products.map((product: Product) => (
          <Card className={styles.card} bodyStyle={{padding: "0"}} key={product.id}>
            <div className={styles.card_img}>
              <Image
                alt={"Obrazek"}
                fill
                quality={100}
                src={product.thumbnail}
                style={imageStyle}
              ></Image>
            </div>
            <h1 className={styles.header}>{product.title}</h1>
            <h2 className={styles.header_sub}>{product.brand}</h2>
            <p className={styles.desc}>{product.description}</p>
            <p className={styles.paragraph_price}>Available from {product.price}$</p>
            <button className={styles.button}>Check more</button>
          </Card>
        ))}
    </div>
  );
};

export default ProductsList;
