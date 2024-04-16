import Image from "next/image";
import styles from './secondCart.module.scss'
import TrashBin from "./TrashBin";

const SecondCard = ({image, price, stock, id, userId} : {image: string, price: number, stock: number, id: number, userId: string}) => {
  return ( 
    <li className={styles.itemContainer}>
      <div className={styles.imageContainer}><Image src={image} alt="product image" fill={true}></Image></div>
      <div className={styles.itemInfo}>
        <p className={styles.paragraph}>Price: {price}</p>
        <p className={styles.paragraph}>Quantity: {stock}</p>
        <p className={styles.paragraph}>Total : {(stock * price).toFixed(2)}$</p>
        <TrashBin itemID={id} userID={userId}></TrashBin>
      </div>
    </li>
   );
}
 
export default SecondCard;