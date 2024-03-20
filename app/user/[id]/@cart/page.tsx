import styles from "./cart.module.scss";
import Link from "next/link";
import Carousel from "@/components/carousel/Carousel";

type Props = {
  params: {
    id: string;
  };
};

type Cart = {
  title: string;
  id: number;
  stock: number;
  image: string;
  price: number;
};

const getUserCart = async (id: string) => {
  const res = await fetch(
    process.env.URL_API +`/getUserCart?userId=${id}`,
    {
      next: { tags: ['cart'] } }
  );
  const cart = await res.json();
  return cart;
};

const Cart = async ({ params }: Props) => {
  const userCart = await getUserCart(params.id);

  return (
    <ul className={styles.cardListContainer}>
      {userCart.length > 0 ? (
        <Carousel children={userCart}/>)
       : (
        <>
          <p className={styles.noItemsParagraph}>
            You do not have items in your cart
          </p>
          <p className={styles.noItemsParagraph}>
            <Link href={"/product"}>You can find products here</Link>
          </p>
        </>
      )}
    </ul>
  );
};
export default Cart;
