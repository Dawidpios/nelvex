import { Card, Space } from "antd";
import Image from "next/image";
import styles from './ProductList.module.scss'
import Link from "next/link";

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

  return (
    <div className={styles.productList_container}>
      {data &&
        data.map((product: Product) => (
          <Card className={styles.card} bodyStyle={{padding: "0"}} key={product.id}>
            <div className={styles.card_img}>
              <Image
                alt={"Product image"}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={true}
                quality={100}
                src={product.thumbnail}
                style={imageStyle}
              ></Image>
            </div>
            <div className={styles.productInfoContainer}> 
              <h1 className={styles.header}>{product.title}</h1>
              <p className={styles.paragraph_price}>Available from {product.price}$</p>
            </div>
            <Link  href={`/product/${product.id}`}><button className={styles.button}>Check more</button></Link>
          </Card>
        ))}
    </div>
  );
};

export default ProductsList;
