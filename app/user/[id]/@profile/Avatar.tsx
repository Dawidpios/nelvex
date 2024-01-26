"use client";
import { useState } from "react";
import style from "./profile.module.scss";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Avatar = () => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const { data: session, update } = useSession()
  const path = usePathname()
  const id = path.split("/").pop()?.toString()

  const handlePicker = () => {
    setShowPicker((prev) => !prev);
  };

  const userAvatarUpdate = async (id : string, image : string) => {
    const res = await fetch('/api/updateUser', {
      method:"POST",
      body: JSON.stringify({id, image}),
      cache: 'no-store'
    })
    const user = await res.json()
    await update({
      ...session,
      user
    })
  }
  return (
    <>
      <button onClick={handlePicker} className={style.button}>
        Pick avatar
      </button>
      
    </>
  );
};

export default Avatar;
