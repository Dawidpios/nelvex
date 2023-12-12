'use client'
import styles from "../ProductPage.module.scss";
import { useState, useReducer } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import counterReducer from "./counterReducer";
import toast, {Toaster} from 'react-hot-toast';

type Props = {
  id: number;
  stock: number;
};


const Stock = ({ id, stock }: Props) => {
  const router = useRouter();
  const [{count}, dispatch] = useReducer(counterReducer, {count: 0}) 
  const { data: session, status } = useSession();

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
      cache: 'no-cache'
    }).then(res => {
      if(res.ok) {
        dispatch({ type: 'reset' })
        router.refresh()
      } else {
        throw new Error('Something went wrong')
      }
    }).catch(e=> toast.error(e))
  }
  return (
    <>
      <div className={styles.statisticsContainer}>
        <p className={styles.paragraph}><b>Stock:</b> {stock - count}</p>
      </div>
      <div className={styles.userCart}>
        <form className={styles.formContainer}>
          <div>
            <button disabled={count <= 0} onClick={decrementHandler}>-</button>
              {count}
            <button disabled={count >= stock} onClick={incrementHandler}>+</button>
          </div>
          <button onClick={onSubmit} type="submit" value="Dodaj do koszyka"></button>
        </form>
      </div>
      <Toaster/>
    </>
  );
};

export default Stock;
