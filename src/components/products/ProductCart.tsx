import Link from "next/link";
import Image from "next/image";
import styles from "./ProductCart.module.scss";

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

const placeholder =
  "https://placehold.co/600x400/000000/FFFFFF/png?font=montserrat&text=No%20image%5CnSorry";

const imageStyle = {
  borderRadius: "2%",
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className={styles.card} key={product.id}>
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
        <button className={styles.button}>
          <Link href={`/product/${product.id}`}> Check more</Link>
        </button>
    </div>
  );
};

export default ProductCard;
