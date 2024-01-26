"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { storage } from "../../utilities/fireBase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

type AddImageProps = {
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
};

const AddImage = ({ setImage }: AddImageProps) => {
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
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
      />
    </>
  );
};

export default AddImage;
