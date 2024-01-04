import Card from "antd/es/card/Card";
import Image from "next/image";
import styles from './cart.module.scss'
import Link from "next/link";
import TrashBin from "./TrashBin";

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
    `http://localhost:3000/api/getUserCart?userId=${id}`,
    { cache: "no-cache" }
  );
  const cart = await res.json();
  return cart;
};

const Cart = async ({ params }: Props) => {
  const userCart = await getUserCart(params.id);

  return (
    <ul className={styles.cardListContainer}>
      {userCart &&
        userCart.map((cart: Cart) => (
          <Card key={cart.id} className={styles.card} bodyStyle={{display: "flex", padding: '0px', width:'100%', border: '1px solid black', borderRadius: '8px'}}>
              <div className={styles.imageContainer}>
                <Image
                  alt={"Product image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={true}
                  quality={75}
                  src={cart.image}
                  style={{borderRadius: '8px 0px 0px 8px'}}
                ></Image>
              </div>
              <div className={styles.cardInfoContainer}>
                <h1>{cart.title}</h1>
                <ul>
                  <li>Quantity: <b>{cart.stock}</b></li>
                  <li>Amount: <b>{cart.stock * cart.price}</b></li>
                </ul>
                <Link href={`/product/${cart.id}`}>Check product page</Link>
              </div>
            <TrashBin userID={params.id} itemID={cart.id}></TrashBin>
          </Card>
        ))}
    </ul>
  );
};
export default Cart;
