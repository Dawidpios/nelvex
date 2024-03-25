"use client";
import Image from "next/image";
import Slider from "react-slick";
import Card from "antd/es/card/Card";
import Link from "next/link";
import styles from "./Carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "./Arrow";
import TrashBin from "../../../app/user/[id]/@cart/TrashBin";
import { useSession } from "next-auth/react";

type Child = {
  title: string;
  id: number;
  stock: number;
  image: string;
  price: number;
};

const Carousel = ({
  children,
  autoplay,
  className,
  cardDirection
}: {
  children: Child[];
  autoplay?: boolean;
  className?: string;
  cardDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
}) => {
  const { data } = useSession();

  const settings = {
    dots: false,
    infinite: children.length > 1,
    speed: !autoplay ? 500 : 4000,
    slidesToShow: children.length > 1 ? 1 : 0,
    slidesToScroll: children.length > 1 ? 1 : 0,
    initialSlide: children.length > 1 ? 1 : 0,
    nextArrow: children.length > 1 && !autoplay ? <Arrow direction="next" /> : <></>,
    prevArrow: children.length > 1 && !autoplay ? <Arrow direction="back" /> : <></>,
    autoplay: autoplay,
    autoplaySpeed: 7000,
  };

  return (
    <div className={`${styles.sliderContainer} ${className && styles[className]}`}>
      <Slider {...settings}>
        {children.length > 0 ? (
          children.map((cart) => (
            <div key={cart.id} className={styles.card}>
              <Card
                bodyStyle={{
                  display: "flex",
                  flexDirection: cardDirection && cardDirection,
                  padding: "0px",
                  width: "100%",
                  borderRadius: "2px",
                }}
              >
                <div className={styles.imageContainer}>
                  <Image
                    alt={"Product image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={true}
                    quality={75}
                    src={cart.image}
                    style={{ borderRadius: "8px" }}
                  ></Image>
                </div>
                <div className={styles.cardInfoContainer}>
                  <h1>{cart.title}</h1>
                  <ul>
                    <li>
                      Quantity: <b>{cart.stock}</b>
                    </li>
                    <li>
                      Price: <b>{cart.price}</b>
                    </li>
                  </ul>
                  <Link href={`/product/${cart.id}`}>Check product page</Link>
                  {!autoplay && (
                  <TrashBin
                    
                    userID={data?.user.id as string}
                    itemID={cart.id}
                  ></TrashBin>
                )}
                </div>
              </Card>
            </div>
          ))
        ) : (
          <>
            <p className={styles.noItemsParagraph}>
              You do not have items in your cart
            </p>
            <p className={styles.noItemsParagraph}>
              <Link href={"/product"}>You can find products here</Link>
            </p>
          </>
        )}
      </Slider>
    </div>
  );
};

export default Carousel;
