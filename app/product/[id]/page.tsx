import { notFound } from "next/navigation";
import Image from "next/image";
import styles from '../ProductPage.module.scss'
import Stock from "./Stock";

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
  rating: number;
  stock: number;
  images: string;
  thumbnail: string;
};

const getProduct = async (id: string) => {
  const product = await fetch("http://localhost:3000/api/getSingleProduct", {
    method: "POST",
    body: JSON.stringify(id),
    cache: "no-cache",
  });
  const result = await product.json();
  return result;
};

const ProductPage = async ({ params }: ParamsProps) => {
  const product = await getProduct(params.id);
  const {
    title,
    price,
    description,
    brand,
    category,
    rating,
    stock,
    images,
    thumbnail,
  }: Product = product;

  if (product.message === "Product not found") {
    notFound();
  }

  return (
    <section className={styles.productPage}>
      <div className={styles.imageContainer}>
        <Image
          alt={"Product image"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={true}
          quality={100}
          src={thumbnail}
        ></Image>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.mainInformationContainer}>
        <p className={styles.paragraph}><b>Brand:</b> {brand}</p>
        <p className={styles.paragraph}><b>Category:</b> {category}</p>
        <p className={styles.paragraph}><b>Price:</b> {price}$</p>
        <p className={styles.paragraph}><b>Rating:</b> {rating}</p>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.paragraph}>{description}</p>
      </div>
      <div className={styles.cartContainer}>
        <Stock id={Number(params.id)} stock={stock}/>
      </div>
    </section>
  );
};

export default ProductPage;
