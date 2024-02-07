import styles from "./homePage.module.scss";
import { TbTruckDelivery } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";
import { RiCustomerService2Line } from "react-icons/ri";

const OfferArticle = () => {
  return (
    <article className={styles.offerArticle}>
      <h1 className={styles.offerArticle_heading}>
        Why buy directly from <span style={{ color: "#FC9918" }}>Nelvex</span>?
      </h1>
      <ul className={styles.offerArticle_list}>
        <li>
          <TbTruckDelivery className={styles.offerArticle_list_icon} />
          <span>Free delivery</span>
        </li>
        <li>
          <GiConfirmed className={styles.offerArticle_list_icon} />
          <span>Verified Products</span>
        </li>
        <li>
          <RiCustomerService2Line className={styles.offerArticle_list_icon} />
          <span>24/7 Customer support</span>
        </li>
      </ul>
    </article>
  );
};

export default OfferArticle;
