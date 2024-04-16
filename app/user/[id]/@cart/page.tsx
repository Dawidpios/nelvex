import styles from "./cart.module.scss";
import Link from "next/link";
import Carousel from "@/components/carousel/Carousel";
import { Suspense } from "react";
import SecondCard from "./secondCart";

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
  const res = await fetch(process.env.URL_API + `/getUserCart?userId=${id}`, {
    next: { tags: ["cart"] },
    cache: "no-cache",
  });
  const cart = await res.json();
  return cart;
};

const Cart = async ({ params }: Props) => {
  const userCart = await getUserCart(params.id);

  const getTotalPrice = async () => {
    let totalPrice = 0;
    userCart.forEach((product: Cart) => {
      totalPrice = totalPrice + product.price;
    });
    return totalPrice;
  };

  if (userCart.length <= 0) {
    return (
      <div className={styles.noItemsContainer}>
        <p className={styles.noItemsParagraph}>
          You do not have items in your cart
        </p>
        <p className={styles.noItemsParagraph}>
          <Link href={"/product"}>You can find products here</Link>
        </p>
      </div>
    );
  }
  return (
    <Suspense fallback={<div>Loading Cart...</div>}>
      <div className={styles.userCart}>
          <ul className={styles.cardListContainer}>
            {userCart.map((product : Cart) => <SecondCard {...product} userId={params.id}></SecondCard>)}
            {/* <Carousel children={userCart}/> */}
          </ul>
        <section className={styles.summaryContainer}>
          <h1>Cart summary</h1>
          <p>Products ordered : {userCart.length}</p>
          <p>Shipping : <span style={{color: 'green'}}>FREE</span></p>
          <p>Total price : {(await getTotalPrice()).toFixed(2)}$ </p>
        </section>
      </div>
    </Suspense>
  );
};
export default Cart;
