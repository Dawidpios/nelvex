"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { storage } from "../fireBase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import style from './AddImage.module.scss'

type AddImageProps = {
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  text?:string;
};

const AddImage = ({ setImage , text}: AddImageProps) => {
  const { data: session, status } = useSession();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = async (file: Blob | Uint8Array | ArrayBuffer) => {
    if (!file) return;
    if (status === "authenticated") {
      const imageId = v4();
      const imageRef = ref(
        storage,
        `users/${session.user.id + "=>" + imageId}`
      );
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setImage(url);
    }
  };

  return (
    <>
      <label className={style.label} htmlFor="fileInput">{text || 'Choose avatar'}</label>
      <input
        name="fileInput"
        id="fileInput"
        className={style.input}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
      />
    </>
  );
};

export default AddImage;
