import Link from "next/link";
import Image from "next/image";
import styles from "./ProductCart.module.scss";
import Button from "../button/Button";
import { FaStar } from "react-icons/fa";
import { TbInfoHexagon } from "react-icons/tb";

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
  borderRadius: "1.3rem",
};

const ProductCard = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  return (
    <div
      key={product.id}
      className={`${styles.card} ${className && styles[className]}`}
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
        {product.rating ? (
          <p className={styles.paragraph_rating}>
            {product.rating?.rate}
            <FaStar style={{ color: "#FFAD33" }} /> ({product.rating?.count}{" "}
            Reviews)
          </p>
        ) : (
          <p className={styles.paragraph_rating}>No rated yet</p>
        )}
        <p className={styles.paragraph_price}>
           <span style={{ color: "#00223C" }}>{product.price}$</span>
        </p>
        <h1 className={styles.header}>{product.title}</h1>
      </div>
      <Button className="productCartButton">
        <Link href={`/product/${product.id}`}>Check more <TbInfoHexagon style={{fontWeight: "bold"}}/></Link>
      </Button>
    </div>
  );
};

export default ProductCard;
