"use client";
import styles from "../ProductPage.module.scss";
import { useReducer } from "react";
import { useSession } from "next-auth/react";
import counterReducer from "./counterReducer";
import getProduct from "./getProduct";
import toast, { Toaster } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Submit from "./Submit";
import action from "../../actions";

type Props = {
  id: string;
  stock: number;
};

const Stock = ({ id, stock }: Props) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ["order"],
    queryFn: () => getProduct(id),
  });
  console.log(status)
  const {
    mutateAsync,
  } = useMutation({
    mutationFn: Submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
  const [{ count }, dispatch] = useReducer(counterReducer, { count: 0 });

  const amount = data?.stock - count;

  const decrementHandler = (event: any) => {
    event.preventDefault();
    dispatch({ type: "decrement" });
  };
  const incrementHandler = (event: any) => {
    event.preventDefault();
    dispatch({ type: "increment" });
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    await mutateAsync({
      userId: session?.user.id as string,
      productId: id,
      count: count,
    });
    action('cart')
    dispatch({ type: "reset" });
  };

  return (
    <>
      <div className={styles.statisticsContainer}>
        <p className={styles.paragraph}>
          <b>Stock:</b>{" "}
            {isFetching ? <CircularProgress style={{ width: '12px', height:'12px' }} color="secondary" variant="indeterminate"  /> : amount}
        </p>
      </div>
      <div className={styles.userCart}>
        <form className={styles.formContainer}>
          <div className={styles.counterContainer}>
            <button
              className={styles.button}
              disabled={count <= 0 || status === "unauthenticated"}
              onClick={decrementHandler}
            >
              -
            </button>
            {count}
            <button
              className={styles.button}
              disabled={count >= stock || status === "unauthenticated"}
              onClick={incrementHandler}
            >
              +
            </button>
          </div>
          <button
            className={styles.button}
            onClick={onSubmit}
            disabled={status === "unauthenticated"}
            type="submit"
            value="Dodaj do koszyka"
          >
            Add to cart
          </button>
        </form>
        {status === "unauthenticated" && <span>Only logged users can order products</span>}
      </div>
      <Toaster />
    </>
  );
};

export default Stock;
