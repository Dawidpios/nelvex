"use client";

import styles from "./cart.module.scss";
import { FcFullTrash } from "react-icons/fc";
import action from "../../../actions";
import { useMutation } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";


const TrashBin = ({ userID, itemID }: { userID: string; itemID: number }) => {
  const deleteItemFromCart = async () => {
    await fetch(`/api/deleteItemFromCart`, {
      method: "POST",
      body: JSON.stringify({
        userID: userID,
        itemID: itemID,
      })
    });
    action('cart')
  };
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteItemFromCart,
    onSuccess: () => {
      action("cart");
    },
  });

  return (
    <div className={styles.cardDeleteButtonContainer}>
      {isPending ? (
        <CircularProgress className={styles.deleteLoader} color="secondary" variant="indeterminate" />
      ) : (
        <FcFullTrash
          onClick={async () => await mutateAsync()}
          className={styles.trash}
        />
      )}
    </div>
  );
};

export default TrashBin;
