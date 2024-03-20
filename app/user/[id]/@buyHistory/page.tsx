import { Card } from "antd";
import Link from "next/link";
import Image from "next/image";
import styles from "./userHistory.module.scss";

type Props = {
  params: {
    id: string;
  };
};

type Item = {
  title: string;
  id: number;
  stock: number;
  image: string;
  price: number;
  status: string;
};

const getUserHistory = async (id: string) => {
  const result = await fetch(
    process.env.URL_API +`/getUserHistory?userId=${id}`,
    { cache: "no-cache" }
  );
  const history = await result.json();
  return history;
};

const History = async ({ params }: Props) => {
  const userHistory = await getUserHistory(params.id);

  return (
    <ul className={styles.list}>
      {userHistory &&
        userHistory.map((item: Item) => (
          <li className={styles.listElement}>
            <Card
              key={`${item.id}`}
              className={styles.card}
              bodyStyle={{
                display: "flex",
                padding: "0px",
                width: "100%",
                border: "1px solid black",
                borderRadius: "8px",
              }}
            >
              <div className={styles.imageContainer}>
                <Image
                  alt={"Product image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={true}
                  quality={100}
                  src={item.image}
                  style={{ borderRadius: "8px 0px 0px 8px" }}
                ></Image>
              </div>
              <div className={styles.cardInfoContainer}>
                <h1>{item.title}</h1>
                <ul>
                  <li>
                    Quantity: <b>{item.stock}</b>
                  </li>
                  <li>
                    Status: <b>{item.status}</b>
                  </li>
                </ul>
                <Link href={`/product/${item.id}`}>Check product page</Link>
              </div>
            </Card>
          </li>
        ))}
    </ul>
  );
};

export default History;
