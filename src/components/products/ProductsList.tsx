import { Card } from "antd";
import Image from "next/image";
import styles from "./ProductList.module.scss";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  image: string;
};

type Props = {
  products: Product[]
}
 const placeholder = 'https://placehold.co/600x400/000000/FFFFFF/png?font=montserrat&text=No%20image%5CnSorry'



const imageStyle = {
  borderRadius: "2%",
};

const ProductsList = async ({products} : Props) => {
  
  return (
    <div className={styles.productList_container}>
      {products &&
        products.map((product: Product) => (
          <Card
            className={styles.card}
            bodyStyle={{ padding: "0" }}
            key={product.id}
          >
            <div className={styles.card_img}>
                <Image
                  alt={"Product image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={true}
                  quality={100}
                  src={`${product?.image ? product.image : placeholder}`}
                  style={imageStyle}
                ></Image>
            </div>
            <div className={styles.productInfoContainer}>
              <h1 className={styles.header}>{product.title}</h1>
              <p className={styles.paragraph_price}>
                Available from {product.price}$
              </p>
            </div>
            <Link href={`/product/${product.id}`}>
              <button className={styles.button}>Check more</button>
            </Link>
          </Card>
        ))}
    </div>
  );
};

export default ProductsList;
