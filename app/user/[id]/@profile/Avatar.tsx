"use client";
import { useState } from "react";
import AddImage from "../../../utilities/AddImage/AddImage";
import style from './profile.module.scss'
import {Toaster, toast} from 'react-hot-toast'
import action from "../../../actions";
import Button from "@/components/button/Button";

const Avatar = ({id} : {id: string}) => {

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handlePicker = () => {
    setShowPicker((prev) => !prev);
  };

  const handleAvatarChange = async () => {
    if(!imageUrl) {
      toast.error('To update your avatar, please choose an image.')
      return
    }
    await fetch("http://localhost:3000/api/updateUser", {
      method: "POST",
      body: JSON.stringify({ id: id, image: imageUrl })
    })
    action('getUser')
  }

  return (
    <>
      <Button text={'Pick avatar'} onClick={handlePicker}></Button>
      {showPicker && <div className={style.avatarModal}>
        <AddImage setImage={setImageUrl}/>
        <Button text={'Set new avatar'} onClick={handleAvatarChange}></Button>
        <Toaster/>
      </div>
}
      </>
  );
};

export default Avatar;
