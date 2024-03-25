import styles from "./cart.module.scss";
import Link from "next/link";
import Carousel from "@/components/carousel/Carousel";
import { Suspense } from "react";

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
      next: { tags: ['cart'] },
      cache: "no-cache"
    },
  );
  const cart = await res.json();
  return cart;
};

const Cart = async ({ params }: Props) => {
  const userCart = await getUserCart(params.id);

  const getTotalPrice = async () => {
    let totalPrice = 0
    userCart.forEach((product: Cart) => {
      totalPrice = totalPrice + product.price
    })
    return totalPrice
  }
  return (
    <div className={styles.userCart}>
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
      <Suspense fallback={<div>Loading Cart...</div>}>
        <section>
          <h1>Cart summary</h1>
          <ul>
            <li>Products ordered : {userCart.length}</li>
            <li>Shipping : </li>
            <li>Total price : {getTotalPrice()}$ </li>
          </ul>
        </section>
      </Suspense>
    </div>
  );
};
export default Cart;
