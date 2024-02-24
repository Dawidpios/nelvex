import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "../ProductPage.module.scss";
import Stock from "./Stock";
import getProduct from "./getProduct";
import { FaStar } from "react-icons/fa";

type ParamsProps = {
  params: {
    id: string;
  };
};

type Product = {
  title: string;
  price: number;
  description: string;
  brand: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
  image: string;
};
const placeholder =
  "https://placehold.co/600x400/000000/FFFFFF/png?font=montserrat&text=No%20image%5CnSorry";

const ProductPage = async ({ params }: ParamsProps) => {
  const product = await getProduct(params.id);
  const { title, price, description, category, rating, stock, image }: Product =
    product;

  if (product.message === "Product not found") {
    notFound();
  }

  return (
    <section className={styles.productPage}>
      <div className={styles.imageContainer}>
        <Image
          style={{ borderRadius: "2rem" }}
          alt={"Product image"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={true}
          quality={100}
          src={image ? image : placeholder}
        ></Image>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.mainInformationContainer}>
        {/* <p className={styles.paragraph}><b>Category:</b> {category ? category : 'None'}</p>
        <p className={styles.paragraph}><b>Price:</b> {price}$</p> */}
        <p className={styles.paragraph}>
          <b>Rating: </b>
          {rating ? (
            <>
              <span>
                {rating.rate}<FaStar style={{color: '#FFAD33'}}/> ({rating.count} Reviews)
              </span>
            </>
          ) : (
            "Product do not have review yet"
          )}
        </p>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.paragraph}>{description ? description : ""}</p>
      </div>
      <div className={styles.cartContainer}>
        <Stock id={params.id} stock={stock} />
      </div>
    </section>
  );
};

export default ProductPage;
