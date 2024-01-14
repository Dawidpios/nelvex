"use client";
import { revalidatePath } from "next/cache";
import styles from "./cart.module.scss";
import { FcFullTrash } from "react-icons/fc";
import action from "../../../actions";

const TrashBin = ({ userID, itemID }: { userID: string; itemID: number }) => {
  const deleteItemFromCart = async () => {
    await fetch(`http://localhost:3000/api/deleteItemFromCart`, {
      method: "POST",
      body: JSON.stringify({
        userID: userID,
        itemID: itemID,
      }),
    });
    action("user");
  };

  return (
    <div className={styles.cardDeleteButtonContainer}>
      <FcFullTrash onClick={deleteItemFromCart} className={styles.trash} />
    </div>
  );
};

export default TrashBin;
