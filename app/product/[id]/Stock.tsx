'use client'
import styles from "../ProductPage.module.scss";
import { useReducer } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import counterReducer from "./counterReducer";
import toast, {Toaster} from 'react-hot-toast';
import { revalidateTag } from "next/cache";

type Props = {
  id: number;
  stock: number;
};


const Stock = ({ id, stock }: Props) => {
  const router = useRouter();
  const [{count}, dispatch] = useReducer(counterReducer, {count: 0}) 
  const { data: session, status } = useSession();
  const amount = stock - count

  const decrementHandler = (event:any) => {
    event.preventDefault()
    dispatch({ type: 'decrement' })
  }
  const incrementHandler = (event:any) => {
    event.preventDefault()
    dispatch({ type: 'increment' })
  }

  const onSubmit = async (event:any) => {
    event.preventDefault()
    await fetch("http://localhost:3000/api/orderProduct", {
      method: 'POST',
      body: JSON.stringify({
        userId: session?.user.id,
        productId: id,
        stock: count
      }),
      cache: 'no-cache',
      next: {
         tags: ['stock'] 
      }
    }).then(res => {
      if(res.ok) {
        router.refresh()
      } else {
        throw new Error('Something went wrong')
      }
    })
    .catch(e=> toast.error(e))

    dispatch({ type: 'reset' })
  }
  return (
    <>
      <div className={styles.statisticsContainer}>
        <p className={styles.paragraph}><b>Stock:</b> {amount}</p>
      </div>
      <div className={styles.userCart}>
        <form className={styles.formContainer}>
          <div className={styles.counterContainer}>
            <button className={styles.button} disabled={count <= 0} onClick={decrementHandler}>-</button>
              {count}
            <button className={styles.button} disabled={count >= stock} onClick={incrementHandler}>+</button>
          </div>
          <button className={styles.button} onClick={onSubmit} type="submit" value="Dodaj do koszyka">Add to cart</button>
        </form>
      </div>
      <Toaster/>
    </>
  );
};

export default Stock;
