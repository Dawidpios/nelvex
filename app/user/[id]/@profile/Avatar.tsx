"use client";
import { useState } from "react";
import style from "./profile.module.scss";
import { PickerOverlay } from "filestack-react";
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
      body: JSON.stringify({id, image})
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
      {showPicker && (
        <PickerOverlay
          apikey={process.env.FILESTACK_API as string}
          pickerOptions={{
            fromSources: ["local_file_system", "url"],
            onUploadDone: (data) => {userAvatarUpdate(id as string, data.filesUploaded[0].url)},
            onClose: () => handlePicker(),
            accept: ["image/jpg"],
            maxFiles: 1,
            minFiles: 1,
            imageMax: [300, 150],
          }}
        ></PickerOverlay>
      )}
    </>
  );
};

export default Avatar;
