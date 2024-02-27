"use client";
import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession, signOut } from "next-auth/react";
import toast, {Toaster} from 'react-hot-toast';
import {z} from 'zod'
import style from "./profile.module.scss";
import Button from "@/components/button/Button";
import { FaRectangleXmark } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValue = {
  oldPassword: string;
  newPassword: string;
};

const formSchema = z.object({
  oldPassword: z.string({
    required_error: "Old password is required"
  }).min(8, 'Old password is required'),
  newPassword: z.string({
    required_error: "New password is required"
  }).min(8, 'New password is required and must contains at least 8 characters')
})

const PasswordChangePopup = () => {
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: zodResolver(formSchema)
  });

  const popupRef = useRef<HTMLDivElement | null>(null);

  const handlePopup = () => {
    if (popupRef?.current) {
      popupRef.current.classList.toggle(style.showPopup);
    }
  };

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    try {
      const { success } = formSchema.safeParse(data);
      console.log(success)
      if(!success) {
        throw "Validation failed"
      }
      fetch('/api/updatePassword', {
        method: "POST",
        body: JSON.stringify({...data, session, status})
      }).then(res => {
        if(res.status === 200) {
          toast.success('Password changed successfully.')
          setTimeout(() => {
            signOut()
          }, 1000)
        }
      })
    } catch(error) {
      toast.error(error as string);
    }
  };

  return (
    <>
      <Button onClick={handlePopup} >Change password</Button>
      <div ref={popupRef} className={style.passwordPopup}>
        <FaRectangleXmark
          className={style.passwordPopup_closeIcon}
          onClick={handlePopup}
        />
        <form
          className={style.passwordPopup_form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="Old password"
            type="text"
            id="oldPass"
            className={style.passwordPopup_form_input}
            {...register("oldPassword")}
          />
          {errors.oldPassword && (
            <span className={style.form_errorMessage}>
              {errors.oldPassword.message}
            </span>
          )}
          <input
            placeholder="New password"
            type="text"
            id="newPassword"
            className={style.passwordPopup_form_input}
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <span className={style.form_errorMessage}>
              {errors.newPassword.message}
            </span>
          )}
          <Button type='submit' className={style.button}>Set new password</Button>
        </form>
      </div>
    </>
  );
};

export default PasswordChangePopup;
