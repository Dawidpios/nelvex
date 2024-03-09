"use client";
import { useState, useRef } from "react";
import AddImage from "../../../utilities/AddImage/AddImage";
import style from "./profile.module.scss";
import { Toaster, toast } from "react-hot-toast";
import action from "../../../actions";
import Button from "@/components/button/Button";
import useHideElement from "./useHideElement";
import { IoCloseOutline } from "react-icons/io5";

const Avatar = ({ id }: { id: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const avatarModalRef = useRef<HTMLDivElement>(null)
  const { showElement, setShowElement } = useHideElement(avatarModalRef)

  const handleAvatarChange = async () => {
    if (!imageUrl) {
      toast.error("To update your avatar, please choose an image.");
      return;
    }
    await fetch("http://localhost:3000/api/updateUser", {
      method: "POST",
      body: JSON.stringify({ id: id, image: imageUrl }),
    });
    action("getUser");
  };

  return (
    <>
      <Button className="noWidthButton" onClick={() => setShowElement(true)}>Pick avatar</Button>
      {showElement && (
        <div className={style.avatarModal} ref={avatarModalRef}>
          <IoCloseOutline className={style.closeIcon} onClick={() => setShowElement(false)}/>
          <AddImage setImage={setImageUrl} />
          <Button className="noWidthButton" onClick={handleAvatarChange}>Set new avatar</Button>
          <Toaster />
        </div>
      )}
    </>
  );
};

export default Avatar;
