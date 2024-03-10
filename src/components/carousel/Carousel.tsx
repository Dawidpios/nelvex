"use client";
import Image from "next/image";
import Slider from "react-slick";
import Card from "antd/es/card/Card";
import Link from "next/link";
import styles from "./Carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "./Arrow";

type Child = {
  title: string;
  id: number;
  stock: number;
  image: string;
  price: number;
};

const Carousel = ({ children, autoplay }: { children: Child[], autoplay?: boolean }) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: !autoplay ? 500 : 4000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: autoplay ? <></> : <Arrow direction="next" />,
    prevArrow: autoplay ? <></> : <Arrow direction="back" />,
    autoplay: autoplay,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {children.length > 0 ? (
          children.map((cart) => (
            <div className={styles.card}>
              <Card
                key={cart.id}
                bodyStyle={{
                  display: "flex",
                  flexDirection: 'column',
                  padding: "0px",
                  width: "100%",
                  borderRadius: "2px"
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
                </div>
                {/* <TrashBin userID={params.id} itemID={cart.id}></TrashBin> */}
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
