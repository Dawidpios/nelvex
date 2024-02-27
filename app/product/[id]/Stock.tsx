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
import Button from "@/components/button/Button";

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
      <>
        <form className={styles.formContainer}>
          <div className={styles.counterContainer}>
            <Button
              className='button_counter'
              disabled={count <= 0 || status === "unauthenticated"}
              onClick={decrementHandler}
            >
              -
            </Button>
              <p className={styles.count}>{count}</p>
            <Button
              className='button_counter'
              disabled={count >= data?.stock || status === "unauthenticated"}
              onClick={incrementHandler}
            >
              +
            </Button>
          </div>
          <Button
            onClick={onSubmit}
            disabled={status === "unauthenticated"}
            type="submit"
          >
            Add to cart
          </Button>
        </form>
        {status === "unauthenticated" && <span className={styles.unauthenticatedMessage}>Only logged users can order products</span>}
      </>
      <Toaster />
    </>
  );
};

export default Stock;
